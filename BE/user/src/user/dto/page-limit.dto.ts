// src/users/dto/find-users.dto.ts

import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PageLimitDto {
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
}
