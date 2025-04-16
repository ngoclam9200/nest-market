import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UserSigninDto {
    @ApiProperty()
    @IsNotEmpty({message:'Email không được để trống'})
    @IsEmail({},{message:'Email không hợp lệ'})
    email:string;

    @ApiProperty()
    @MinLength(4 , {message:'Mật khẩu ít nhất 4 kí tự'})
    password:string;
    
    @ApiProperty()
    is_admin:number;
}
