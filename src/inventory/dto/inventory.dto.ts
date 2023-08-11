import { Type } from 'class-transformer';
import { IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class GetAllInventoriesDto {
    @Type(() => Number)
    @Min(1)
    @IsNumber()
    @IsOptional()
    page?: number = 1;

    @Type(() => Number)
    @Min(1)
    @Max(500)
    @IsNumber()
    @IsOptional()
    limit?: number = 10;
}

export class CreateInventoryDto {
    @MinLength(4)
    @MaxLength(25)
    @IsString()
    @IsNotEmpty()
    inventory_name: string;

    @IsISO8601({ strict: true })
    manufacture_date: Date;

    @Min(1)
    @IsNumber()
    @IsNotEmpty()
    available_quantity: number;
}

export class UpdateInventoryDto {
    @MinLength(4)
    @MaxLength(25)
    @IsString()
    @IsOptional()
    inventory_name?: string;

    @IsISO8601({ strict: true })
    @IsOptional()
    manufacture_date?: Date;

    @Min(1)
    @IsNumber()
    @IsOptional()
    available_quantity?: number;
}