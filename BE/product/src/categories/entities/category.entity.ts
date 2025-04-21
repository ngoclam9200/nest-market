import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @Column()
  media_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: string;

  @Column()
  user_id_created: number;

  @Column()
  user_id_updated: number;

  @Column({ nullable: true })
  parent_id: number | null;

  @Column({ nullable: true })
  code: string;

  @Column({ default: 1, name: 'status' })
  status: number;
}
