/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
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
    private r2Service: R2Service,
  ) { }

  async create(
    createReflectorDto: CreateReflectorDto,
    files: {
      image?: Express.Multer.File[],
      file?: Express.Multer.File[],
      datasheet?: Express.Multer.File[],
    }
  ): Promise<Reflector> {
    console.log('Creating reflector:', createReflectorDto.name);
    console.log('Files received:', {
      hasImage: !!files?.image?.length,
      hasFile: !!files?.file?.length,
      hasDatasheet: !!files?.datasheet?.length,
    });

    if (!files?.image?.[0]) {
      throw new Error('Image file is required');
    }

    // Upload files to R2
    const imageUrl = await this.r2Service.uploadFileOptional(
      files.image[0],
      'reflectors/images',
      '/default-reflector-image.jpg',
    );
    console.log('Image uploaded:', imageUrl);

    let fileUrl: string | null = null;
    if (files?.file?.[0]) {
      fileUrl = await this.r2Service.uploadFile(
        files.file[0],
        'reflectors/files',
      );
      console.log('File uploaded:', fileUrl);
    }

    let datasheetUrl: string | null = null;
    if (files?.datasheet?.[0]) {
      datasheetUrl = await this.r2Service.uploadFile(
        files.datasheet[0],
        'reflectors/datasheets',
      );
      console.log('Datasheet uploaded:', datasheetUrl);
    }

    return this.prisma.reflector.create({
      data: {
        name: createReflectorDto.name ?? '',
        image: imageUrl ?? null,
        description: createReflectorDto.description ?? null,
        specs: createReflectorDto.specs ?? [],
        features: createReflectorDto.features ?? [],
        certifications: createReflectorDto.certifications,
        ...(fileUrl && { file: fileUrl }),
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
