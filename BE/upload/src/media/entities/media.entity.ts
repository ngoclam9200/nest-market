import { TypeMedia } from 'src/utils/common/type-media-enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('media')
export class MediaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ default: '' })
  name: string;

  @Column()
  size: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: string;

  @Column({ default: 1 })
  status: number;

  @Column({ type: 'enum', enum: TypeMedia, default: TypeMedia.FILE })
  type: number;
}
