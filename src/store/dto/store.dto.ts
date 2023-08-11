import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class GetAllStoresDto {
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

export class CreateStoreDto {
    @IsString()
    @IsNotEmpty()
    store_address: string;

    @IsString()
    @IsNotEmpty()
    store_manager_name: string;
}

export class UpdateStoreDto {
    @IsString()
    @IsOptional()
    store_address?: string;

    @IsString()
    @IsOptional()
    store_manager_name?: string;
}