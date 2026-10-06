dockerfile
# ========================================================
# STAGE 1: Build the Vue Frontend outside the backend
# ========================================================
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ .
# 2) Changed npm run build to npm run generate
RUN npm run generate

# ========================================================
# STAGE 2: Build the NestJS Backend
# ========================================================
FROM node:20-alpine AS backend-builder
WORKDIR /app/backend

RUN apk add --no-cache openssl curl

COPY backend/package*.json ./
COPY backend/prisma ./prisma/
RUN npm ci

COPY backend/ .
RUN npx prisma generate
RUN npm run build
RUN npm prune --production

# ========================================================
# STAGE 3: Final Single Container Runner
# ========================================================
FROM node:20-alpine AS runner
WORKDIR /app

RUN apk add --no-cache openssl

# Copy the backend runtime environment
COPY --from=backend-builder /app/backend/node_modules ./node_modules
COPY --from=backend-builder /app/backend/dist ./dist
COPY --from=backend-builder /app/backend/package*.json ./
COPY --from=backend-builder /app/backend/prisma ./prisma

# 1) Copy static frontend files from frontend/.output/public instead
COPY --from=frontend-builder /app/frontend/.output/public ./client

# Expose port 80 for everything
ENV PORT=80
EXPOSE 80

# Run CockroachDB migrations and fire up the single server process
CMD ["sh", "-c", "npx prisma db push && node dist/main.js"]

# Commands to build and run
# docker build -t opencv .
# docker run -d -p 80:80 e DATABASE_URL="postgresql://root@host.docker.internal:26257/defaultdb?sslmode=disable" --name opencv opencv