import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';
import prisma from '../lib/prisma.js';
export const PRISMA_TOKEN = 'PRISMA_CLIENT';

@Global()
@Module({
  providers: [{ provide: PRISMA_TOKEN, useValue: prisma }],
  exports: [PRISMA_TOKEN],
})
export class PrismaModule {}
