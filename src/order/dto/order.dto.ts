import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { ICustomer } from "../../customer/customer.interface";
import { IInventory } from "../../inventory/inventory.interface";
import { IStore } from "../../store/store.interface";
import { DeepPartial } from "typeorm";
import { OrderStatus } from "../order.interface";

export class GetAllOrdersDto {
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

export class CreateOrderDto {
    @IsNotEmpty()
    @IsNumber()
    customer?: DeepPartial<ICustomer>;

    @IsNotEmpty()
    @IsNumber()
    inventory: DeepPartial<IInventory>;

    @IsNotEmpty()
    @IsNumber()
    store: DeepPartial<IStore>;

    @Min(1)
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsString()
    @IsNotEmpty()
    @IsEnum(OrderStatus)
    status: OrderStatus;
}

export class UpdateOrderDto {
    @IsNumber()
    @IsOptional()
    customer?: DeepPartial<ICustomer>;

    @IsNumber()
    @IsOptional()
    inventory?: DeepPartial<IInventory>;

    @IsNumber()
    @IsOptional()
    store?: DeepPartial<IStore>;

    @Min(1)
    @IsNumber()
    @IsOptional()
    quantity?: number;

    @IsString()
    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;
}