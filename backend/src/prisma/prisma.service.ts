import { Injectable, Module, OnModuleInit } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../src/generated/client/index.js';
import prisma from '../lib/prisma.js';
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
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
