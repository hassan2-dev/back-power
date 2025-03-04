import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBatteryDto } from './dto/create-battery.dto';
import { UpdateBatteryDto } from './dto/update-battery.dto';
import { Battery } from '@prisma/client';

@Injectable()
export class BatteriesService {
  constructor(private prisma: PrismaService) {}

  create(createBatteryDto: CreateBatteryDto): Promise<Battery> {
    return this.prisma.battery.create({
      data: {
        name: createBatteryDto.name,
        description: createBatteryDto.description,
        file: createBatteryDto.file,
        quantity: createBatteryDto.quantity,
      },
    });
  }

  findAll(): Promise<Battery[]> {
    return this.prisma.battery.findMany();
  }

  findOne(id: string): Promise<Battery | null> {
    return this.prisma.battery.findUnique({
      where: { id },
    });
  }

  update(id: string, updateBatteryDto: UpdateBatteryDto): Promise<Battery> {
    return this.prisma.battery.update({
      where: { id },
      data: updateBatteryDto,
    });
  }

  remove(id: string): Promise<Battery> {
    return this.prisma.battery.delete({
      where: { id },
    });
  }
}
