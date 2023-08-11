import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './inventory.entity';
import { IInventory, IInventoryListResponse } from './inventory.interface';
import { CreateInventoryDto, GetAllInventoriesDto, UpdateInventoryDto } from './dto/inventory.dto';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory)
        private readonly inventoryRepository: Repository<Inventory>,
    ) { }

    async getAllInventories(getAllInventoriesDto: GetAllInventoriesDto): Promise<IInventoryListResponse> {
        const { page = 1, limit = 10 } = getAllInventoriesDto;
        const [results, total] = await this.inventoryRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });

        return {
            page,
            limit,
            total,
            pages: limit > 0 ? Math.ceil(total / limit) || 1 : null,
            results,
        };
    }

    async getInventoryById(id: number): Promise<IInventory> {
        const inventory = await this.inventoryRepository.findOne({
            where: { inventory_id: id },
        });
        if (!inventory) throw new NotFoundException("inventory does not exist!");
        return inventory;
    }

    async createInventory(createInventoryDto: CreateInventoryDto): Promise<IInventory> {
        createInventoryDto.manufacture_date = new Date(createInventoryDto.manufacture_date)
        return this.inventoryRepository.save(createInventoryDto);
    }

    async updateInventory(id: number, updateInventoryDto: UpdateInventoryDto): Promise<IInventory> {
        await this.inventoryRepository.update(id, updateInventoryDto);
        return this.getInventoryById(id)
    }
}
