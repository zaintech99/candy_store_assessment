import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class GetAllCustomersDto {
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

export class CreateUpdateCustomerDto {
    @MinLength(4)
    @MaxLength(25)
    @IsString()
    @IsNotEmpty()
    customer_name: string;
}
