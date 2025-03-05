import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreateReflectorDto {
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsArray()
  @IsString({ each: true })
  specs: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  certifications?: string[];

  @IsString()
  @IsOptional()
  datasheet?: string;
}
