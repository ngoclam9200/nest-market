import { UserResponse } from './user.response';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { MediaResponse } from './media.response';
import { formatDateTime } from '../common/date-time-format';

export class CategoryResponse {
  id: number = 0;
  name: string = '';
  description: string = '';
  media_id: number;
  created_at: string = '';
  updated_at: string = '';
  user_created?: UserResponse = new UserResponse();
  parent_id: number = 0;
  code: string = '';
  status: number = 0;
  constructor(data?: Partial<CategoryResponse>) {
    if (data) {
      Object.assign(this, data);
    }
  }
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
    created_at: formatDateTime(category.created_at),
    updated_at: formatDateTime(category.updated_at),
    parent_id: category.parent_id,
    code: category.code,
    media: {
      ...media,
      name: media.name || '',
    },
    status: category.status,
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
    created_at: formatDateTime(category.created_at),
    updated_at: formatDateTime(category.updated_at),
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
  };
  return response;
}
