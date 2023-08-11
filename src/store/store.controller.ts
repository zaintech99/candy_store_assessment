import { Controller, Get, Post, Put, Param, Body, Query, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service';
import { IStore, IStoreListResponse } from './store.interface';
import { GetAllStoresDto, CreateStoreDto, UpdateStoreDto } from './dto/store.dto';
import { LocalAuthGuard } from '../auth/local.auth.guard';

@UseGuards(LocalAuthGuard)
@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  async getAllStores(@Query() getAllStoresDto: GetAllStoresDto): Promise<IStoreListResponse> {
    return this.storeService.getAllStores(getAllStoresDto);
  }

  @Get(':id')
  async getStoreById(@Param('id') id: number): Promise<IStore> {
    return this.storeService.getStoreById(id);
  }

  @Post()
  async createStore(@Body() createStoreDto: CreateStoreDto): Promise<IStore> {
    return this.storeService.createStore(createStoreDto);
  }

  @Put(':id')
  async updateStore(@Param('id') id: number, @Body() updateStoreDto: UpdateStoreDto): Promise<IStore> {
    return this.storeService.updateStore(id, updateStoreDto);
  }
}
