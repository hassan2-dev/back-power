/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { BatteriesService } from './batteries.service';
import { CreateBatteryDto } from './dto/create-battery.dto';
import { UpdateBatteryDto } from './dto/update-battery.dto';
import { multerConfig } from '../config/multer.config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

@Controller('batteries')
export class BatteriesController {
  constructor(private readonly batteriesService: BatteriesService) { }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'file', maxCount: 1 },
      { name: 'datasheet', maxCount: 1 }
    ], multerConfig)
  )
  async create(
    @Body() createBatteryDto: CreateBatteryDto,
    @UploadedFiles() files: {
      image?: Express.Multer.File[],
      file?: Express.Multer.File[],
      datasheet?: Express.Multer.File[]
    }
  ) {
    // Debug logging
    console.log('Received files:', {
      image: files?.image?.[0] ? {
        name: files.image[0].originalname,
        size: files.image[0].size,
        buffer: files.image[0].buffer ? 'Present' : 'Missing'
      } : 'No image',
      file: files?.file?.[0] ? 'Present' : 'Missing',
      datasheet: files?.datasheet?.[0] ? 'Present' : 'Missing'
    });

    if (!files?.image) {
      throw new BadRequestException('Image file is required');
    }
    return this.batteriesService.create(createBatteryDto, files);
  }

  @Get()
  findAll() {
    console.log('findAll batteries');
    return this.batteriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.batteriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBatteryDto: UpdateBatteryDto) {
    return this.batteriesService.update(id, updateBatteryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.batteriesService.remove(id);
  }
}
