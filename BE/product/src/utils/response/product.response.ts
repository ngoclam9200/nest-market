import { UserResponse } from './user.response';
import { ProductEntity } from 'src/products/entities/product.entity';
import { MediaResponse } from './media.response';
import { CategoryResponse } from './category.response';
import { formatDateTime } from '../common/date-time-format';

export class ProductResponse {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  status: number;
  rating: number;
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
    stock: product.stock,
    discount: product.discount,
    rating: product.rating,
    description: product.description,
    created_at: formatDateTime(product.created_at),
    updated_at: formatDateTime(product.updated_at),
    status: product.status,
    brand: product.brand,
    origin: product.origin,
    expiry_date: product.expiry_date,
    storage_instructions: product.storage_instructions,

    media: list_media,
    media_default,
    category: category ? category : new CategoryResponse(),
    // category ? category : null,
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
