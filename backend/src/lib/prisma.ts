import { PrismaClient } from '../../src/generated/client/index.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const prismaClientSingleton = () => {
  const connectionConfig =
    process.env.DATABASE_URL
    ? process.env.DATABASE_URL
    : {
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 3306,
      user: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || '',
      database: process.env.DATABASE_NAME || 'opencv',
      connectionLimit: process.env.NODE_ENV === 'production' ? 10 : 2,
      supportBigNumbers: true,
      bigNumberStrings: false,
      decimalNumbers: true
    };

  const adapter = new PrismaMariaDb(connectionConfig as any);

  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;