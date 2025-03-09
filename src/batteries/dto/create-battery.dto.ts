/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
 
/* eslint-disable prettier/prettier */
import { IsString, IsInt, IsOptional, Min, IsArray } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateBatteryDto {
    @IsString()
    name: string;

    @IsArray()
    @Transform(({ value }: TransformFnParams) =>
        Array.isArray(value) ? value : JSON.parse(value as string) as string[]
    )
    @IsString({ each: true })
    specs: string[];

    @IsArray()
    @Transform(({ value }: TransformFnParams) =>
        Array.isArray(value) ? value : JSON.parse(value as string) as string[]
    )
    @IsString({ each: true })
    features: string[];

    @IsArray()
    @Transform(({ value }: TransformFnParams) =>
        Array.isArray(value) ? value : JSON.parse(value as string) as string[]
    )
    @IsString({ each: true })
    certifications: string[];

    @IsString()
    @IsOptional()
    description?: string;

    @IsInt()
    @Min(0)
    @Transform(({ value }: TransformFnParams) => parseInt(value as string))
    quantity: number;

    // Remove image validation since it will be handled as a file
    image?: any;
    file?: any;
    datasheet?: any;
}
