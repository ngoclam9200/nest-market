// src/users/dto/find-users.dto.ts

import {
  IsDefined,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FindAllCategoryChildDTO {
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

  @Type(() => Number)
  @IsInt()
  parent_id: number;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  branch_id: number;
}

export class FindAllCategoryParentDTO {

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  status?: number = -1;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  branch_id: number;
}
