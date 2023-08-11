import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IInventory } from './inventory.interface';

@Entity()
export class Inventory implements IInventory {
  @PrimaryGeneratedColumn()
  inventory_id: number;

  @Column()
  inventory_name: string;

  @Column()
  manufacture_date: Date;

  @Column()
  available_quantity: number;
}
