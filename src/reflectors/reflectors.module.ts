import { Module } from '@nestjs/common';
import { ReflectorsService } from './reflectors.service';
import { ReflectorsController } from './reflectors.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReflectorsController],
  providers: [ReflectorsService],
})
export class ReflectorsModule {}
