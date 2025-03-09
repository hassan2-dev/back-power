/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ReflectorsService } from './reflectors.service';
import { UpdateReflectorDto } from './dto/update-reflector.dto';
import { multerConfig } from '../config/multer.config';
import { CreateReflectorDto } from './dto/create-reflector.dto';
import { Request } from 'express';

@Controller('reflectors')
export class ReflectorsController {
  constructor(private readonly reflectorsService: ReflectorsService) { }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'file', maxCount: 1 },
      { name: 'datasheet', maxCount: 1 }
    ], multerConfig)
  )
  async create(
    @Body() createReflectorDto: CreateReflectorDto,
    @UploadedFiles() files: {
      image?: Express.Multer.File[],
      file?: Express.Multer.File[],
      datasheet?: Express.Multer.File[]
    },
    @Req() request: Request
  ) {
    console.log('===== CREATE REFLECTOR REQUEST DEBUG =====');
    console.log('Request headers:', request.headers);
    console.log('Request content-type:', request.headers['content-type']);
    console.log('Body keys:', Object.keys(createReflectorDto));
    console.log('Files received:', files ? 'Files object exists' : 'No files object');

    // Debug what's in the request
    if (files) {
      Object.keys(files).forEach(key => {
        console.log(`Files['${key}']:`, files[key]?.length > 0 ? 'Has files' : 'Empty array');
      });
    }

    // More permissive check - first try to use the file, then fall back to string URL
    if (files?.image?.[0]) {
      console.log('✅ Image file found in request');
    } else if (createReflectorDto.image) {
      console.log('✅ Image URL found in request:', createReflectorDto.image);
    } else {
      console.log('❌ No image file or URL found');
      throw new BadRequestException('Image file or URL is required');
    }

    // Make sure we're passing a valid files object
    const filesData = {
      image: files?.image || [],
      file: files?.file || [],
      datasheet: files?.datasheet || []
    };

    console.log('Prepared filesData for service:', {
      hasImage: filesData.image.length > 0,
      hasFile: filesData.file.length > 0,
      hasDatasheet: filesData.datasheet.length > 0
    });

    return this.reflectorsService.create(createReflectorDto, filesData);
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
