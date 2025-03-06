import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ReflectorsService } from './reflectors.service';
import { CreateReflectorDto } from './dto/create-reflector.dto';
import { UpdateReflectorDto } from './dto/update-reflector.dto';

@Controller('reflectors')
export class ReflectorsController {
  constructor(private readonly reflectorsService: ReflectorsService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'datasheet', maxCount: 1 },
  ]))
  create(
    @Body() createReflectorDto: CreateReflectorDto,
    @UploadedFiles() files: {
      image?: Express.Multer.File[];
      datasheet?: Express.Multer.File[];
    },
  ) {
    return this.reflectorsService.create(createReflectorDto, files);
  }

  @Get()
  findAll() {
    return this.reflectorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reflectorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReflectorDto: UpdateReflectorDto) {
    return this.reflectorsService.update(id, updateReflectorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reflectorsService.remove(id);
  }
}
