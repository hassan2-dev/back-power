import { Module } from '@nestjs/common';
import { ReflectorsService } from './reflectors.service';
import { ReflectorsController } from './reflectors.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [PrismaModule, CommonModule],
  controllers: [ReflectorsController],
  providers: [ReflectorsService],
})
export class ReflectorsModule {}
