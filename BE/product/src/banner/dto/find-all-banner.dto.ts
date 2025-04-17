// src/users/dto/find-users.dto.ts

import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAllBannerDTO {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  status?: number = -1;
}
