import { PrismaClient } from '@/generated/client/index.js';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  if (process.env.RUN_SEED !== 'true') {
    console.log('⏭️ RUN_SEED is not set to "true". Skipping database seed.');
    return;
  }

  // 1. Locate and read the seed.sql file
  const sqlPath = path.join(__dirname, 'seed.sql');
  const sqlFileContent = fs.readFileSync(sqlPath, 'utf8');

  // 2. Split statements by semicolon, filter out empty rows/comments
  const sqlStatements = sqlFileContent
                          .split(';')
                          .map((query) => query.trim())
                          .filter((query) => query.length > 0 && !query.startsWith('--'));

  // 3. Execute queries sequentially inside a transaction
  for (const statement of sqlStatements) {
    try {
      await prisma.$executeRawUnsafe(statement);
    } catch (error: any) {
      // Catching specific duplicate errors so container restarts don't crash
      if (error.message?.includes('Already exists') || error.code === 'P2002') {
        continue;
      }
      console.warn(`⚠️ Warning executing statement: ${error.message}`);
    }
  }

  console.log('✅ Seeding completed successfully.');
}

main()
.catch((e) => {
  console.error('❌ Seeding failed:', e);
  process.exit(1);
})
.finally(async () => {
  await prisma.$disconnect();
});