import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllProductDTO {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  status?: number = -1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  category_id?: number = -1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  from_price?: number = -1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  to_price?: number = -1;
  
  @ApiProperty({
    required: false,
    default: 0,
    description: '0: no sort, 1: price low to high, 2: price high to low',
  })
  @IsOptional()
  @Type(() => Number)
  sort_by?: number;
}
