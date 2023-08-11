import { Controller, Get, Post, Put, Param, Body, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { IInventory, IInventoryListResponse } from './inventory.interface';
import { CreateInventoryDto, GetAllInventoriesDto, UpdateInventoryDto } from './dto/inventory.dto';
import { LocalAuthGuard } from '../auth/local.auth.guard';

@UseGuards(LocalAuthGuard)
@Controller('inventories')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  @Get()
  async getAllInventories(@Query() getAllInventoriesDto: GetAllInventoriesDto): Promise<IInventoryListResponse> {
    return this.inventoryService.getAllInventories(getAllInventoriesDto);
  }

  @Get(':id')
  async getInventoryById(@Param('id') id: number): Promise<IInventory> {
    return this.inventoryService.getInventoryById(id);
  }

  @Post()
  async createInventory(@Body() createInventoryDto: CreateInventoryDto): Promise<IInventory> {
    return this.inventoryService.createInventory(createInventoryDto);
  }

  @Put(':id')
  async updateInventory(@Param('id') id: number, @Body() updateInventoryDto: UpdateInventoryDto): Promise<IInventory> {
    return this.inventoryService.updateInventory(id, updateInventoryDto);
  }
}
