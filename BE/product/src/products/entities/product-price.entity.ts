import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
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

  @CreateDateColumn()
  start_date: Timestamp;

  @UpdateDateColumn({nullable: true})
  end_date: Timestamp;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;

  @Column()
  user_id_created: number;

  @Column()
  user_id_updated: number;

}
