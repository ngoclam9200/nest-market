import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsInt, IsNotEmpty, Min } from "class-validator";

// src/users/dto/find-users.dto.ts
export class UpdateProfileDto {
    @ApiProperty()
    @IsInt()
    id : number;

    @ApiProperty()
    @IsNotEmpty({message:'Email không được để trống'})
    username:string;

    @ApiProperty()
    @IsNotEmpty({message:'Email không được để trống'})
    @IsEmail({},{message:'Email không hợp lệ'})
    email: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    @IsInt()
    gender: number;
  }
  