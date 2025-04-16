import { Timestamp } from 'typeorm';
import { UserResponse } from './user.response';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { MediaResponse } from './media.response';
import { status } from '@grpc/grpc-js';

export interface CategoryResponse {
  id: number;
  name: string;
  description: string;
  media_id: number;
  created_at: Timestamp;
  updated_at: Timestamp;
  user_created?: UserResponse;
  parent_id: number;
  code: string;
  status: number;
}

export function mapCateGoryResponseWithUser(
  category: CategoryEntity,
  media: MediaResponse,
) {
  const response = {
    id: category.id,
    name: category.name,
    description: category.description,
    media_id: category.media_id,
    created_at: category.created_at,
    updated_at: category.updated_at,
    parent_id: category.parent_id,
    code: category.code,
    media: {
      ...media,
      name: media.name || '',
    },
    status: category.status,
    branch_id: category.branch_id,
  };
  return response;
}

export function mapCateGoryResponseWithAdmin(
  categoryParent: CategoryEntity,
  category: CategoryEntity,
  user_created: UserResponse,
  user_updated: UserResponse,
  media: MediaResponse,
) {
  const response = {
    id: category.id,
    name: category.name,
    description: category.description,
    media_id: category.media_id,
    created_at: category.created_at,
    updated_at: category.updated_at,
    parent_id: category.parent_id,
    parent: categoryParent,
    user_created: user_created,
    user_updated: user_updated,
    media: {
      ...media,
      name: media.name || '',
    },
    code: category.code,
    status: category.status,
    branch_id: category.branch_id,
  };
  return response;
}
