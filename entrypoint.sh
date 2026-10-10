#!/bin/sh
# set -e

echo "➡️ 1. Starting temporary local MySQL service for initialization..."
mysqld --user=mysql --skip-networking --lower-case-table-names=1 &
PID=$!

echo "⏳ Waiting for MySQL socket to become responsive..."
until mysqladmin ping --socket=/run/mysqld/mysqld.sock --silent; do
  sleep 1
done

echo "➡️ 2. Setting up user permissions and base database..."
mysql -e "
  CREATE DATABASE IF NOT EXISTS my_app_db;
  CREATE USER IF NOT EXISTS 'app_user'@'127.0.0.1' IDENTIFIED BY '';
  GRANT ALL PRIVILEGES ON my_app_db.* TO 'app_user'@'127.0.0.1';
  CREATE USER IF NOT EXISTS 'app_user'@'localhost' IDENTIFIED BY '';
  GRANT ALL PRIVILEGES ON my_app_db.* TO 'app_user'@'localhost';
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
# Explicitly pass NODE_ENV=development so Prisma can parse prisma.config.ts properly
NODE_ENV=development pnpm prisma db push --accept-data-loss || {
  echo "⚠️ WARNING: Prisma schema sync failed, but keeping container alive..."
}

if [ "$RUN_SEED" = "true" ]; then
  echo "🌱 5. Automatic execution: Seeding data tables..."
  # Run via tsx with development flags to allow on-the-fly TypeScript compilation
  NODE_ENV=development npx tsx ./prisma/seed/seed.ts || {
    echo "⚠️ WARNING: Database seeding failed, skipping..."
  }
else
  echo "⏭️ Skipping automatic data seeding (RUN_SEED is not set to true)."
fi

echo "🚀 6. Launching production NestJS Backend application layers..."
exec node dist/main.js