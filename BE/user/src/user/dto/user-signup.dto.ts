import { IsEmail, IsNotEmpty, IsString, MinLength, isEmail } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

 

export class UserSignupDto {
    @ApiProperty()
    @IsNotEmpty({message:'Username can not be empty'})
    @IsString({message:'Name shoul be string'})
    username:string;

    @ApiProperty()
    @IsNotEmpty({message:'Email can not be empty'})
    @IsEmail({},{message:'Pleadse provide a valid email'})
    email:string;

    @ApiProperty()
    @IsNotEmpty({message:'Password can not be empty'})
    @MinLength(4 , {message:'Password minimum character should be 4'})
    password:string;
}
