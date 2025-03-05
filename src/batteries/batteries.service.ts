/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBatteryDto } from './dto/create-battery.dto';
import { UpdateBatteryDto } from './dto/update-battery.dto';
import { Battery } from '@prisma/client';

@Injectable()
export class BatteriesService {
  constructor(private prisma: PrismaService) { }

  create(
    createBatteryDto: CreateBatteryDto,
    files: {
      image?: Express.Multer.File[],
      file?: Express.Multer.File[],
      datasheet?: Express.Multer.File[]
    }
  ): Promise<Battery> {
    const imagePath = files?.image?.[0]?.filename ?? null;
    const filePath = files?.file?.[0]?.filename ?? null;
    const datasheetPath = files?.datasheet?.[0]?.filename ?? null;

    if (!imagePath) {
      throw new Error('Image file is required');
    }

    console.log('Creating battery with data:', {
      name: createBatteryDto.name,
      image: imagePath,
      specs: createBatteryDto.specs,
      features: createBatteryDto.features,
      certifications: createBatteryDto.certifications,
      description: createBatteryDto.description,
      file: filePath,
      datasheet: datasheetPath,
      quantity: Number(createBatteryDto.quantity),
    });

    return this.prisma.battery.create({
      data: {
        name: createBatteryDto.name,
        image: imagePath,
        specs: createBatteryDto.specs,
        features: createBatteryDto.features,
        certifications: createBatteryDto.certifications,
        ...(createBatteryDto.description && { description: createBatteryDto.description }),
        ...(filePath && { file: filePath }),
        ...(datasheetPath && { datasheet: datasheetPath }),
        quantity: Number(createBatteryDto.quantity),
      },
    });
  }

  async findAll(): Promise<Battery[]> {
    try {
      return await this.prisma.battery.findMany();
    } catch (error) {
      console.error('Error fetching batteries:', error);
      throw error;
    }
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
