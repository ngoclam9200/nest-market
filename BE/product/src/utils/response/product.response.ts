import { Timestamp } from 'typeorm';
import { UserResponse } from './user.response';
import { ProductEntity } from 'src/products/entities/product.entity';
import { MediaResponse } from './media.response';
import { CategoryResponse } from './category.response';

export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  created_at: Timestamp;
  updated_at: Timestamp;
  status: number;
  user_created?: UserResponse;
  user_updated?: UserResponse;
}

function mapProductResponseBase(
  product: ProductEntity,
  list_media: MediaResponse[],
  category: CategoryResponse,
) {
  const media_default = list_media.find(
    (item) => item.id === product.default_media_id,
  ) || {
    id: 0,
    url: '',
    type: 0,
    created_at: '',
    updated_at: '',
    size: 0,
    status: false,
  };

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    unit: product.unit,
    quantity: product.quantity,
    discount: product.discount,
    description: product.description,
    created_at: product.created_at,
    updated_at: product.updated_at,
    status: product.status,
    media: list_media,
    media_default,
    category,
  };
}

export function mapProductResponseWithAdmin(
  product: ProductEntity,
  user_created: UserResponse,
  user_updated: UserResponse,
  list_media: MediaResponse[],
  category: CategoryResponse,
) {
  return {
    ...mapProductResponseBase(product, list_media, category),
    user_created,
    user_updated,
  };
}

export function mapProductResponseWithUser(
  product: ProductEntity,
  list_media: MediaResponse[],
  category: CategoryResponse,
) {
  return mapProductResponseBase(product, list_media, category);
}
