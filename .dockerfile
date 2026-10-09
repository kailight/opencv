# ==========================================
# STAGE 1: Build the Nuxt 4 Static Frontend
# ==========================================
FROM node:22-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ .
RUN npm run generate

# ==========================================
# STAGE 2: Build the NestJS Backend
# ==========================================
FROM node:22-alpine AS backend-builder
WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci

COPY backend/ .
RUN npx prisma generate
RUN npm run build

# ==========================================
# STAGE 3: Final Production Runtime Stack
# ==========================================
FROM node:22-alpine
WORKDIR /app

# Install MySQL server locally
RUN apk add --no-cache mysql mysql-client

# Setup MySQL system directories
RUN mkdir -p /run/mysqld /var/lib/mysql && \
    chown -R mysql:mysql /run/mysqld /var/lib/mysql && \
    mysql_install_db --user=mysql --datadir=/var/lib/mysql

# Copy production backend files
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --only=production

COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY --from=backend-builder /app/backend/node_modules/.prisma ./backend/node_modules/.prisma
COPY --from=backend-builder /app/backend/node_modules/@prisma/client ./backend/node_modules/@prisma/client
COPY --from=backend-builder /app/backend/prisma ./backend/prisma
COPY --from=frontend-builder /app/frontend/.output/public /app/backend/client

# Setup environment variables
ENV NODE_ENV=production
ENV PORT=4000
# THIS ENABLES THE SEED ONLY INSIDE THIS CONTAINER IMAGE
ENV RUN_SEED=true

# The container itself resolves "localhost", so it uses 3306 internally
ENV DATABASE_URL="mysql://root:@localhost:3306/opencv"

# Expose the internal container ports
EXPOSE 3306 4000

# Bootstraps MySQL database structures, applies prisma migrations, and boots NestJS
CMD sh -c "\
  mysqld --user=mysql --skip-networking & \
  sleep 2 && \
  mysql -e 'CREATE DATABASE IF NOT EXISTS opencv;' && \
  pkill mysqld && \
  sleep 1 && \
  mysqld --user=mysql --console & \
  sleep 2 && \
  cd backend && \
  npx prisma migrate deploy && \
  node dist/src/main\
"