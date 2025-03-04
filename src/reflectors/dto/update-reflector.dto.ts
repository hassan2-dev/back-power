import { PartialType } from '@nestjs/mapped-types';
import { CreateReflectorDto } from './create-reflector.dto';

export class UpdateReflectorDto extends PartialType(CreateReflectorDto) {}
