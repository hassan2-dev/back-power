import { Module } from '@nestjs/common';
import { BatteriesService } from './batteries.service';
import { BatteriesController } from './batteries.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [BatteriesController],
  providers: [BatteriesService, PrismaService],
})
export class BatteriesModule {}
