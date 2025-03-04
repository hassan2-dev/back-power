import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReflectorsService } from './reflectors.service';
import { CreateReflectorDto } from './dto/create-reflector.dto';
import { UpdateReflectorDto } from './dto/update-reflector.dto';

@Controller('reflectors')
export class ReflectorsController {
  constructor(private readonly reflectorsService: ReflectorsService) {}

  @Post()
  create(@Body() createReflectorDto: CreateReflectorDto) {
    return this.reflectorsService.create(createReflectorDto);
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
