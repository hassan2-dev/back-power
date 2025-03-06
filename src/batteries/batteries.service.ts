/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBatteryDto } from './dto/create-battery.dto';
import { UpdateBatteryDto } from './dto/update-battery.dto';
import { Battery } from '@prisma/client';
import { R2Service } from '../common/r2.service';

@Injectable()
export class BatteriesService {
  constructor(
    private prisma: PrismaService,
    private r2Service: R2Service
  ) { }

  async create(
    createBatteryDto: CreateBatteryDto,
    files: {
      image?: Express.Multer.File[],
      file?: Express.Multer.File[],
      datasheet?: Express.Multer.File[]
    }
  ): Promise<Battery> {
    console.log('Creating battery with DTO:', createBatteryDto);
    console.log('Received files:', {
      image: files?.image?.map(f => f.originalname),
      file: files?.file?.map(f => f.originalname),
      datasheet: files?.datasheet?.map(f => f.originalname)
    });

    if (!files?.image || files.image.length === 0) {
      throw new Error('Image file is required');
    }

    try {
      // Upload files to R2
      console.log('Uploading image to R2...');
      const imageUrl = await this.r2Service.uploadFileOptional(
        files.image[0],
        'batteries/images',
        '/default-battery-image.jpg'  // default image path
      );
      console.log('Image uploaded successfully:', imageUrl);

      let fileUrl: string | null = null;
      let datasheetUrl: string | null = null;

      if (files?.file && files.file.length > 0) {
        console.log('Uploading file to R2...');
        fileUrl = await this.r2Service.uploadFileOptional(
          files.file[0],
          'batteries/files',
          '/default-battery-file.pdf'  // default file path
        );
        console.log('File uploaded successfully:', fileUrl);
      }

      if (files?.datasheet && files.datasheet.length > 0) {
        console.log('Uploading datasheet to R2...');
        datasheetUrl = await this.r2Service.uploadFileOptional(
          files.datasheet[0],
          'batteries/datasheets',
          '/default-datasheet.pdf'  // default datasheet path
        );
        console.log('Datasheet uploaded successfully:', datasheetUrl);
      }

      console.log('Creating battery record in database...');
      const battery = await this.prisma.battery.create({
        data: {
          name: createBatteryDto.name,
          image: imageUrl,
          specs: createBatteryDto.specs,
          features: createBatteryDto.features,
          certifications: createBatteryDto.certifications,
          ...(createBatteryDto.description && { description: createBatteryDto.description }),
          ...(fileUrl && { file: fileUrl }),
          ...(datasheetUrl && { datasheet: datasheetUrl }),
          quantity: Number(createBatteryDto.quantity),
        },
      });

      console.log('Battery created successfully:', battery);
      return battery;

    } catch (error) {
      console.error('Error in battery creation:', error);
      throw error;
    }
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
