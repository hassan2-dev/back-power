import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
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
