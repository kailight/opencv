import { Controller, Get, Inject, ServiceUnavailableException } from '@nestjs/common';
import { AppService } from './app.service.js';
import { PRISMA_TOKEN } from './prisma/prisma.module.js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(PRISMA_TOKEN) private readonly prisma: { $queryRaw: (query: TemplateStringsArray, ...values: unknown[]) => Promise<unknown> },
  ) {}

  @Get('health')
  async getHealth() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        status: 'ok',
        database: 'connected',
        timestamp: new Date().toISOString(),
      };
    } catch {
      throw new ServiceUnavailableException({
        status: 'error',
        database: 'disconnected',
        timestamp: new Date().toISOString(),
      });
    }
  }
}
