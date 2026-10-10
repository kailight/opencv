import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';
import prisma from '../lib/prisma.js';
export const PRISMA_TOKEN = 'PRISMA_CLIENT';

@Global()
@Module({
  providers: [PrismaService, { provide: PRISMA_TOKEN, useExisting: PrismaService }],
  exports: [PrismaService, PRISMA_TOKEN],
})
export class PrismaModule {}
