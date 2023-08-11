import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Inventory } from '../inventory/inventory.entity';
import { Store } from '../store/store.entity';
import { Customer } from '../customer/customer.entity';
import { IOrder, OrderStatus } from './order.interface';

@Entity()
export class Order implements IOrder{
    @PrimaryGeneratedColumn()
    order_id: number;

    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @ManyToOne(() => Inventory)
    @JoinColumn({ name: 'inventory_id' })
    inventory: Inventory;

    @ManyToOne(() => Store)
    @JoinColumn({ name: 'store_id' })
    store: Store;

    @Column()
    quantity: number;

    @Column()
    status: OrderStatus;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_date: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    update_date: Date;
}
