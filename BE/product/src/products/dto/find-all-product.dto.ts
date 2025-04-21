import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

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
}
