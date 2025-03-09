import { IsString, IsArray, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateReflectorDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @Transform(({ value }): Express.Multer.File | undefined =>
    value ? (value as Express.Multer.File) : undefined,
  )
  file?: Express.Multer.File;

  @Transform(({ value }): string[] => {
    if (Array.isArray(value)) return value as string[];
    if (!value) return [];
    return String(value).split(',');
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  specs?: string[];

  @Transform(({ value }): string[] => {
    if (Array.isArray(value)) return value as string[];
    if (!value) return [];
    return String(value).split(',');
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];

  @Transform(({ value }): string[] => {
    if (Array.isArray(value)) return value as string[];
    if (!value) return [];
    return String(value).split(',');
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  certifications?: string[];

  @IsString()
  @IsOptional()
  datasheet?: string;
}
