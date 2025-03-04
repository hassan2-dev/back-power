import { IsString, IsInt, IsOptional, Min } from 'class-validator';

export class CreateBatteryDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    file?: string;

    @IsInt()
    @Min(0)
    quantity: number;
}
