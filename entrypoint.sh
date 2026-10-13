#!/bin/sh
# set -e

# 👇 Use Render UI environment variable or fallback to a secure default string
DB_PASS="${DATABASE_PASSWORD:secure_password}"

echo "➡️ 1. Starting temporary local MySQL service for initialization..."
mysqld --user=mysql --skip-networking --lower-case-table-names=1 &
PID=$!

echo "⏳ Waiting for MySQL socket to become responsive..."
until mysqladmin ping --socket=/run/mysqld/mysqld.sock --silent; do
  sleep 1
done

echo "➡️ 2. Setting up user permissions and base database with password security..."
mysql -e "
  CREATE DATABASE IF NOT EXISTS my_app_db;

  -- Clear out old profiles to prevent conflicting credential states
  DROP USER IF EXISTS 'app_user'@'127.0.0.1';
  DROP USER IF EXISTS 'app_user'@'localhost';
  DROP USER IF EXISTS 'app_user'@'%';

  -- Create clean users using the environment variable directly (with a safe fallback if empty)
  CREATE USER 'app_user'@'127.0.0.1' IDENTIFIED BY '${DATABASE_PASSWORD:-prod_secure_pass_2026}';
  CREATE USER 'app_user'@'localhost' IDENTIFIED BY '${DATABASE_PASSWORD:-prod_secure_pass_2026}';
  CREATE USER 'app_user'@'%' IDENTIFIED BY '${DATABASE_PASSWORD:-prod_secure_pass_2026}';

  -- Grant full permissions across all matching scopes
  GRANT ALL PRIVILEGES ON my_app_db.* TO 'app_user'@'127.0.0.1';
  GRANT ALL PRIVILEGES ON my_app_db.* TO 'app_user'@'localhost';
  GRANT ALL PRIVILEGES ON my_app_db.* TO 'app_user'@'%';

  FLUSH PRIVILEGES;
"

echo "➡️ 3. Cycling engine to expose network bindings..."
mysqladmin shutdown --socket=/run/mysqld/mysqld.sock
wait $PID

# Relaunch MySQL on exposed ports so Prisma can reach it over TCP loopback
mysqld --user=mysql --console --skip-networking=0 --bind-address=0.0.0.0 --port=3306 &

echo "⏳ Waiting for network database engine initialization..."
until mysqladmin ping --host=127.0.0.1 --port=3306 --protocol=tcp --silent; do
  sleep 1
done

echo "➡️ 4. Syncing database schema via Prisma..."
# Ensure DATABASE_PASSWORD exists from your Render Dashboard UI
if [ -z "$DATABASE_PASSWORD" ]; then
  echo "❌ ERROR: DATABASE_PASSWORD environment variable is missing in Render UI!"
  exit 1
fi

# 👇 This builds the URL safely inside the container's volatile memory at boot time
export DATABASE_URL="mysql://app_user:${DATABASE_PASSWORD}@127.0.0.1:3306/my_app_db"

# Sync schema with explicit environment mapping
NODE_ENV=development pnpm prisma db push --accept-data-loss || {
  echo "⚠️ WARNING: Prisma schema sync failed..."
}

if [ "$RUN_SEED" = "true" ]; then
  echo "🌱 5. Automatic execution: Seeding data tables..."
  NODE_ENV=development npx tsx ./prisma/seed/seed.ts || {
    echo "⚠️ WARNING: Database seeding failed..."
  }
else
  echo "⏭️ Skipping automatic data seeding (RUN_SEED is not set to true)."
fi

echo "🚀 6. Launching production NestJS Backend application layers..."
NODE_ENV=production exec node dist/main.js