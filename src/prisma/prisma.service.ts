import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      log: ['warn', 'error'],
    });
  }

  async onModuleInit() {
    return await this.$connect();
  }
  async onModuledestroy() {
    return await this.$disconnect();
  }
}
