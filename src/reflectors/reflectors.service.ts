import { Injectable } from '@nestjs/common';
import { CreateReflectorDto } from './dto/create-reflector.dto';
import { UpdateReflectorDto } from './dto/update-reflector.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Reflector } from '@prisma/client';
import { R2Service } from '../common/r2.service';

@Injectable()
export class ReflectorsService {
  constructor(
    private prisma: PrismaService,
    private r2Service: R2Service
  ) {}

  async create(
    createReflectorDto: CreateReflectorDto,
    files: {
      image?: Express.Multer.File[],
      datasheet?: Express.Multer.File[]
    },
    image?: Express.Multer.File
  ): Promise<Reflector> {
    if (!files?.image?.[0] && !image) {
      throw new Error('Image file is required');
    }

    // Upload files to R2
    const imageUrl = await this.r2Service.uploadFileOptional(
      image, 
      'reflectors',
      '/default-reflector-image.jpg'  // provide a default image URL
    );
    const datasheetUrl = files?.datasheet?.[0] ? 
      await this.r2Service.uploadFile(files.datasheet[0], 'reflectors/datasheets') : null;

    return this.prisma.reflector.create({
      data: {
        name: createReflectorDto.name,
        image: imageUrl,
        specs: createReflectorDto.specs,
        features: createReflectorDto.features,
        certifications: createReflectorDto.certifications,
        ...(datasheetUrl && { datasheet: datasheetUrl }),
      },
    });
  }

  findAll(): Promise<Reflector[]> {
    return this.prisma.reflector.findMany();
  }

  findOne(id: string): Promise<Reflector | null> {
    return this.prisma.reflector.findUnique({
      where: { id },
    });
  }

  update(
    id: string,
    updateReflectorDto: UpdateReflectorDto,
  ): Promise<Reflector> {
    return this.prisma.reflector.update({
      where: { id },
      data: {
        name: updateReflectorDto.name,
        image: updateReflectorDto.image,
        specs: updateReflectorDto.specs,
        features: updateReflectorDto.features,
        certifications: updateReflectorDto.certifications,
        datasheet: updateReflectorDto.datasheet,
      },
    });
  }

  remove(id: string): Promise<Reflector> {
    return this.prisma.reflector.delete({
      where: { id },
    });
  }
}
