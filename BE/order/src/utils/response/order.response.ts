import { ProductResponse } from './product.response';
import { UserResponse } from './user.response';
import { AddressUserResponse } from './address-user.response';
import { TransactionResponse } from './transaction.response';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { formatDateTime } from '../common/date-time-format';

export class OrderResponse {
  id: number;
  product: ProductResponse[]; // Changed from ProductResponse to ProductResponse[]
  user: UserResponse;
  address_user: AddressUserResponse;
  transaction: TransactionResponse;
  status: number;
  total_price: number;
  description: string;
  created_at: string;
  updated_at: string;
  quantity: number;
}

export function mapOrderResponse(
  order: OrderEntity,
  products: ProductResponse[],
  user: UserResponse,
  addressUser: AddressUserResponse,
  transaction: TransactionResponse,
): OrderResponse {
  return {
    id: order.id,
    product: products,
    user: user,
    address_user: addressUser,
    transaction: transaction,
    status: order.status,
    total_price: order.total_price,
    description: order.description,
    created_at: formatDateTime(order.created_at),
    updated_at: formatDateTime(order.updated_at),
    quantity: order.quantity,
  };
}
