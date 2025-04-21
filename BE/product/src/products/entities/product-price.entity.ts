import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product_price')
export class ProductPriceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  product_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  start_date: string;

  @UpdateDateColumn({ nullable: true })
  end_date: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: string;

  @Column()
  user_id_created: number;

  @Column()
  user_id_updated: number;
}
