import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
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

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;

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

  @Column({ default: 0 })
  branch_id: number;
}
