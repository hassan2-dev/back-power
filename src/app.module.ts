import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ReflectorsModule } from './reflectors/reflectors.module';
import { BatteriesModule } from './batteries/batteries.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, ReflectorsModule, BatteriesModule, UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
