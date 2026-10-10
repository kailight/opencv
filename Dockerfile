# ==========================================
# STAGE 1: Build the Nuxt 4 Static Frontend
# ==========================================
FROM mirror.gcr.io/library/node:22-alpine AS frontend-builder
WORKDIR /app/frontend

RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_CONFIG_MINIMUM_RELEASE_AGE=0

COPY frontend/package.json frontend/pnpm-lock.yaml frontend/pnpm-workspace.yaml ./
RUN pnpm install --config.minimum-release-age=0

COPY frontend/ ./
ENV NUXT_PUBLIC_API_BASE_URI=http://localhost:4000/
ENV API_BASE_URI=http://localhost:4000/
RUN pnpm run generate

# ==========================================
# STAGE 2: Build the NestJS Backend
# ==========================================
FROM mirror.gcr.io/library/node:22-alpine AS backend-builder
WORKDIR /app/backend

RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_CONFIG_MINIMUM_RELEASE_AGE=0

COPY backend/package.json backend/pnpm-lock.yaml backend/pnpm-workspace.yaml ./
RUN pnpm install --config.minimum-release-age=0

COPY backend/ ./
RUN pnpm prisma generate
RUN pnpm run build

# ==========================================
# STAGE 3: Final Production Runtime Stack
# ==========================================
FROM mirror.gcr.io/library/node:22-alpine
WORKDIR /app/backend

RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_CONFIG_MINIMUM_RELEASE_AGE=0
RUN apk add --no-cache mysql mysql-client dos2unix

RUN mkdir -p /run/mysqld /var/lib/mysql && \
    chown -R mysql:mysql /run/mysqld /var/lib/mysql && \
    mysql_install_db --user=mysql --datadir=/var/lib/mysql

COPY backend/package.json backend/pnpm-lock.yaml backend/pnpm-workspace.yaml ./
RUN pnpm install --prod --config.minimum-release-age=0

COPY --from=backend-builder /app/backend/dist ./dist
COPY --from=backend-builder /app/backend/src/generated/client ./src/generated/client
COPY --from=backend-builder /app/backend/prisma ./prisma
COPY --from=backend-builder /app/backend/prisma.config.ts ./prisma.config.ts
COPY --from=frontend-builder /app/frontend/.output/public ./client

# Copy and prepare entrypoint runner
COPY entrypoint.sh /entrypoint.sh
RUN dos2unix /entrypoint.sh && chmod +x /entrypoint.sh

ENV NODE_ENV=production
ENV PORT=4000
ENV DATABASE_URL="mysql://app_user:@127.0.0.1:3306/my_app_db"
ENV DATABASE_HOST=127.0.0.1
ENV DATABASE_PORT=3306
ENV DATABASE_USER=app_user
ENV DATABASE_PASSWORD=
ENV DATABASE_NAME=my_app_db
ENV RUN_SEED=true

EXPOSE 3306 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:4000/health || exit 1

ENTRYPOINT ["/entrypoint.sh"]
