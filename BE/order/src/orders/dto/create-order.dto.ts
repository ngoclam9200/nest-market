import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

// Define a type for a product with its quantity
export class OrderProductItem {
  @ApiProperty({ description: 'ID của sản phẩm' })
  @IsNumber({}, { message: 'ID sản phẩm phải là số' })
  product_id: number;

  @ApiProperty({ description: 'Số lượng của sản phẩm' })
  @IsNumber({}, { message: 'Số lượng phải là số' })
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    type: [OrderProductItem],
    description: 'Danh sách sản phẩm và số lượng ',
  })
  @IsNotEmpty({ message: 'Danh sách sản phẩm không được để trống' })
  @IsArray({ message: 'Danh sách sản phẩm phải là một mảng' })
  @ValidateNested({ each: true })
  @Type(() => OrderProductItem)
  products: OrderProductItem[];

  @ApiProperty()
  total_price: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Hình thức thanh toán không được để trống' })
  transaction_type: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  address_user_id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  description?: string;
}
