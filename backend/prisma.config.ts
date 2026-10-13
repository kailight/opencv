import "dotenv/config";
import { defineConfig } from "prisma/config"; // Remove 'env' import

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed/seed.ts",
  },
  datasource: {
    // 👇 FIX FOR Render.com: Use native process.env so it evaluates dynamically inside the container
    url: process.env.DATABASE_URL
  },
});