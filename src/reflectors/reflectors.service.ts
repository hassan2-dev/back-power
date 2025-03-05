import { Injectable } from '@nestjs/common';
import { CreateReflectorDto } from './dto/create-reflector.dto';
import { UpdateReflectorDto } from './dto/update-reflector.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Reflector } from '@prisma/client';

@Injectable()
export class ReflectorsService {
  constructor(private prisma: PrismaService) {}

  create(createReflectorDto: CreateReflectorDto): Promise<Reflector> {
    return this.prisma.reflector.create({
      data: {
        name: createReflectorDto.name,
        image: createReflectorDto.image,
        specs: createReflectorDto.specs,
        features: createReflectorDto.features,
        certifications: createReflectorDto.certifications,
        datasheet: createReflectorDto.datasheet,
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
