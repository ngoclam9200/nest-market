import { IsEmail, IsNotEmpty, IsString, MinLength, isEmail } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

 

export class UserSignupDto {
    @ApiProperty()
    @IsNotEmpty({message:'Username không được để trống'})
    @IsString({message:'Username phải là chuỗi'})
    username:string;

    @ApiProperty()
    @IsNotEmpty({message:'Email không được để trống'})
    @IsEmail({},{message:'Email không hợp lệ'})
    email:string;

    @ApiProperty()
    @IsNotEmpty({message:'Mật khẩu không được để trống'})
    @MinLength(4 , {message:'Mật khẩu ít nhất 4 kí tự'})
    password:string;
}
