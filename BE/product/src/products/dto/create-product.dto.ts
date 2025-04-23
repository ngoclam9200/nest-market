import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  category_id: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  default_media_id: number;

  @ApiProperty()
  @IsNumber({}, { each: true })
  @IsArray()
  list_media_id: number[];

  @ApiProperty()
  discount: number;

  @ApiProperty()
  unit: string;

  @ApiProperty()
  quantity: number;
  @ApiProperty()
  brand: string;

  @ApiProperty()
  origin: string;

  @ApiProperty()
  expiry_date: string;

  @ApiProperty()
  storage_instructions: string;
 
}
