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
        description: createReflectorDto.description,
        file: createReflectorDto.file,
        quantity: createReflectorDto.quantity,
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

  update(id: string, updateReflectorDto: UpdateReflectorDto): Promise<Reflector> {
    return this.prisma.reflector.update({
      where: { id },
      data: {
        name: updateReflectorDto.name,
        description: updateReflectorDto.description,
        file: updateReflectorDto.file,
        quantity: updateReflectorDto.quantity,
      },
    });
  }

  remove(id: string): Promise<Reflector> {
    return this.prisma.reflector.delete({
      where: { id },
    });
  }
}
