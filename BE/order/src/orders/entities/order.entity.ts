import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
export interface OrderProduct {
  product_id: number;
  quantity: number;
}
@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb', { default: [] })
  products: OrderProduct[];

  @Column()
  user_id: number;

  @Column()
  address_user_id: number;

  @Column({ default: 0 })
  quantity: number;

  @Column({ default: 0 })
  status: number;

  @Column({ default: 0 })
  transaction_type: number;

  @Column({ default: 0 })
  total_price: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: string;

  @Column({ default: '' })
  description: string;
}
