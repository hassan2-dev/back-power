import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      log: ['error', 'warn'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    // Helper method to clean connections if needed
    await this.$disconnect();
    await this.$connect();
  }

  findAll() {
    return `This action returns all prisma`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prisma`;
  }

  remove(id: number) {
    return `This action removes a #${id} prisma`;
  }
}
