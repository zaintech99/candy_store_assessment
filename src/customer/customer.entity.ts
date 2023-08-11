import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ICustomer } from './customer.interface';

@Entity()
export class Customer implements ICustomer{
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column()
  customer_name: string;
}
