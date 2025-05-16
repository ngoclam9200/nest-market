import { Observable } from 'rxjs';
import { ApiResponse } from './response.interface';
import { ProductResponse } from '../response/product.response';

export interface ProductServiceGrpcClient {
  getProduct(
    getProductRequest: GetProductRequest,
  ): Observable<ApiResponse<ProductResponse>>;
  getProductsByIds(
    getProductByIdsRequest: GetProductByIdsRequest,
  ): Observable<ApiResponse<ProductResponse[]>>;
  updateStockProduct(
    updateCountProductRequest: updateCountProductRequest,
  ): Observable<ApiResponse<ProductResponse>>;
}

export interface GetProductRequest {
  id: number;
}

export interface GetProductByIdsRequest {
  product_ids: number[];
}

export interface OrderProductItem {
  product_id: number;
  quantity: number;
}
export interface updateCountProductRequest {
  order_product_items: OrderProductItem[];
  increase: number; // 1: increase, 0: decrease
}
