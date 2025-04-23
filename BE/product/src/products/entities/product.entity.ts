import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_id: number;

  @Column({ type: 'simple-array', default: [] })
  list_media_id: number[];

  @Column()
  default_media_id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: string;

  @Column()
  user_id_created: number;

  @Column()
  user_id_updated: number;

  @Column({ default: 1 })
  status: number;

  @Column({ default: '' })
  unit: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  discount: number;

  @Column({ default: 0 })
  quantity: number;

  @Column({ default: 0 })
  stock: number;

  @Column('float', { default: 3.5 })
  rating: number;

  @Column({ default: '' })
  brand: string;

  @Column({ default: '' })
  origin: string;

  @Column({ default: '' })
  expiry_date: string;

  @Column({ default: '' })
  storage_instructions: string;
}
