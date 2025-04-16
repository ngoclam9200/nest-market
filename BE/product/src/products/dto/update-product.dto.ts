
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProductDto  {


    @ApiProperty()
    @IsInt()
    @IsNotEmpty({ message: 'Id không được để trống' })
    id: number;

    @ApiProperty()
    category_id: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'Tên không được để trống' })
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    default_media_id: number;

    @ApiProperty()
    @IsNumber({}, { each: true }) 
    @IsArray()  
    list_media_id: number[];

    


}
