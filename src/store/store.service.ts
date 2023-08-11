import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './store.entity';
import { IStore, IStoreListResponse } from './store.interface';
import { CreateStoreDto, GetAllStoresDto, UpdateStoreDto } from './dto/store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) { }

  async getAllStores(getAllStoresDto: GetAllStoresDto): Promise<IStoreListResponse> {
    const { page = 1, limit = 10} = getAllStoresDto;
    const [results, total] = await this.storeRepository.findAndCount({
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

  async getStoreById(id: number): Promise<IStore> {
    const store = await this.storeRepository.findOne({
      where: { store_id: id },
    });
    if (!store) throw new NotFoundException("store does not exist!");
    return store;
  }

  async createStore(createStoreDto: CreateStoreDto): Promise<IStore> {
    return this.storeRepository.save(createStoreDto);
  }

  async updateStore(id: number, updateStoreDto: UpdateStoreDto): Promise<IStore> {
    await this.storeRepository.update(id, updateStoreDto);
    return this.getStoreById(id)
  }
}
