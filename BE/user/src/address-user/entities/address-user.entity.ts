import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address_user')
export class AddressUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  is_default: boolean;

  @Column()
  ward_code: string;

  @Column()
  district_id: number;

  @Column()
  province_id: number;

  @Column()
  address: string;
}
