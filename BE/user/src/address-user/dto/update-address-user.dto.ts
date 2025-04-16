import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressUserDto } from './create-address-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateAddressUserDto {

  @ApiProperty()
  @IsInt()
  id : number;

  @ApiProperty()
  @IsNotEmpty({message:'Địa chỉ không được để trống'})
  address:string;

  @ApiProperty()
  @IsNotEmpty({message:'Id tỉnh/thành phố không được để trống'})
  @IsInt()
  province_id : number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty({message:'Id quận/huyện không được để trống'})
  district_id : number;

  @ApiProperty()
  @IsNotEmpty({message:'Id phường/xã không được để trống'})
  ward_code: string;

  @ApiProperty()
  @IsBoolean()
  is_default: boolean;
}