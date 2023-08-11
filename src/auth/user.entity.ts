import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IUser } from './user.interface';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  user_name: string;

  @Column()
  user_email: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  token_expire?: number;
}
