import {Injectable, Module, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../src/generated/client/index.js';
import prisma from '@/lib/prisma.js';
export const PRISMA_TOKEN = 'PRISMA_CLIENT';

@Module({
  providers: [
    {
      provide: PRISMA_TOKEN,
      useValue: prisma, // Inject the exact same instance used by Next.js
    },
  ],
  exports: [PRISMA_TOKEN],
})
export class PrismaModule {}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const connectionConfig =
      process.env.DATABASE_URL ?
      process.env.DATABASE_URL :
      {
        host: process.env.DATABASE_HOST || 'localhost',
        port: Number(process.env.DATABASE_PORT) || 3306,
        user: process.env.DATABASE_USER || 'root',
        password: process.env.DATABASE_PASSWORD || '',
        database: process.env.DATABASE_NAME || 'opencv',
      };

    super({
      adapter: new PrismaMariaDb(connectionConfig as any),
      log: ['query', 'info', 'warn', 'error'], // <-- Add 'query' here
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
