import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IStore } from './store.interface';

@Entity()
export class Store implements IStore {
  @PrimaryGeneratedColumn()
  store_id: number;

  @Column()
  store_address: string;

  @Column()
  store_manager_name: string;
}
