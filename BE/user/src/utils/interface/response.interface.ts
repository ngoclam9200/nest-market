import { HttpStatus } from '@nestjs/common';

export interface ApiResponse<T> {
  status: HttpStatus;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
    list: T[];
    total_record: number;
    page: number;
    limit: number;
  }