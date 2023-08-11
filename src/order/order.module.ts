import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { StoreModule } from '../store/store.module';
import { CustomerModule } from '../customer/customer.module';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), CustomerModule, InventoryModule, StoreModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [CustomerModule, InventoryModule, StoreModule]
})
export class OrderModule { }
