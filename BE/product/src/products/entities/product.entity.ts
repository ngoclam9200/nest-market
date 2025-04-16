
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

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

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;

  @Column()
  user_id_created: number;

  @Column()
  user_id_updated: number;

  @Column()
  branch_id: number;

  @Column({default: 1})
  status: number;
}


