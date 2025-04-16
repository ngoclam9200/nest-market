
import { Roles } from "src/utils/common/user-roles.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ default: '' })
  phone?: string;

  @Column({ default: '' })
  avatar?: string;

  @Column({ default: 1 })
  gender?: number;

  @Column()
  password?: string;

  @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.USER] })
  roles: Roles[];

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;

  @Column({ default: 1 })
  status?: number;

  @Column({ default: 0 })
  branch_id?: number;

  @Column({ nullable: true })
  access_token: string;
}

