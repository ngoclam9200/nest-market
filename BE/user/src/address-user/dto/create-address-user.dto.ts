 

import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEmpty, IsInt, IsNotEmpty, Min } from "class-validator";

// src/users/dto/find-users.dto.ts
export class CreateAddressUserDto {
    @ApiProperty()
    @IsInt()
    user_id : number;

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
