import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { IOrder, IOrderListResponse } from './order.interface';
import { CreateOrderDto, GetAllOrdersDto, UpdateOrderDto } from './dto/order.dto';
import { CustomerService } from '../customer/customer.service';
import { InventoryService } from '../inventory/inventory.service';
import { StoreService } from '../store/store.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly customerService: CustomerService,
        private readonly inventoryService: InventoryService,
        private readonly storeService: StoreService,
    ) { }

    async getAllOrders(getAllOrdersDto: GetAllOrdersDto): Promise<IOrderListResponse> {
        const { page = 1, limit= 10 } = getAllOrdersDto;
        const [results, total] = await this.orderRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.store', 'store')
            .leftJoinAndSelect('order.customer', 'customer')
            .leftJoinAndSelect('order.inventory', 'inventory')
            .select([
                'order.order_id',
                'store',
                'customer',
                'inventory',
                'order.quantity',
                'order.status',
                'order.create_date',
                'order.update_date',
            ])
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

        return {
            page,
            limit,
            total,
            pages: limit > 0 ? Math.ceil(total / limit) || 1 : null,
            results,
        };
    }

    async getOrderById(id: number): Promise<IOrder> {
        const order = await this.orderRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.store', 'store')
            .leftJoinAndSelect('order.customer', 'customer')
            .leftJoinAndSelect('order.inventory', 'inventory')
            .where('order.order_id = :id', { id })
            .select([
                'order.order_id',
                'store',
                'customer',
                'inventory',
                'order.quantity',
                'order.status',
                'order.create_date',
                'order.update_date',
            ])
            .getOne();
        if (!order) throw new NotFoundException("entity does not exist!");
        return order;
    }

    async createOrder(createOrderDto: CreateOrderDto): Promise<IOrder> {
        const { customer, inventory, store }: any = createOrderDto;
        await this.customerService.getCustomerById(customer)
        await this.inventoryService.getInventoryById(inventory)
        await this.storeService.getStoreById(store)

        return this.orderRepository.save(createOrderDto);
    }

    async updateOrder(id: number, updateOrderDto: UpdateOrderDto): Promise<IOrder> {
        const { customer, inventory, store }: any = updateOrderDto;
        await this.customerService.getCustomerById(customer)
        await this.inventoryService.getInventoryById(inventory)
        await this.storeService.getStoreById(store)


        await this.orderRepository.update(id, updateOrderDto);
        return this.getOrderById(id)
    }

    async generateMonthlyReport(): Promise<any> {
        const currentDate = new Date();
        const lastMonthDate = new Date();
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

        const report = await this.orderRepository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.store', 'store')
            .select(['store.store_manager_name', 'order.status', 'COUNT(order.order_id) AS count'])
            .where('order.create_date BETWEEN :lastMonth AND :currentDate', { lastMonth: lastMonthDate, currentDate })
            .groupBy('store.store_manager_name, order.status')
            .getRawMany();

        return report;
    }
}
