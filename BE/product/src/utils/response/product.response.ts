import { Timestamp } from 'typeorm';
import { UserResponse } from './user.response';
import { ProductEntity } from 'src/products/entities/product.entity';
import { MediaResponse } from './media.response';

export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  created_at: Timestamp;
  updated_at: Timestamp;
  // price: number;
  status: number;
  user_created?: UserResponse;
  user_updated?: UserResponse;
}

export function mapProductResponseWithAdmin(
  product: ProductEntity,
  // price: number,
  user_created: UserResponse,
  user_updated: UserResponse,
  list_media: MediaResponse[],
) {
  let media_default = list_media.find(
    (item) => item.id == product.default_media_id,
  );
  const response = {
    id: product.id,
    name: product.name,
    // price: price,
    description: product.description,
    created_at: product.created_at,
    updated_at: product.updated_at,
    status: product.status,
    user_created: user_created,
    user_updated: user_updated,
    media: list_media,
    media_default: media_default,
  };
  return response;
}

export function mapProductResponseWithUser(
  product: ProductEntity,
  // price: number,
  list_media: MediaResponse[],
) {
  let media_default = list_media.find(
    (item) => item.id == product.default_media_id,
  );
  const response = {
    id: product.id,
    name: product.name,
    // price:price,
    description: product.description,
    created_at: product.created_at,
    updated_at: product.updated_at,
    status: product.status,
    media: list_media,
    media_default: media_default,
  };
  return response;
}
