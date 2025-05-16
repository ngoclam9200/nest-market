import { Observable } from 'rxjs';
import { ApiResponse } from './response.interface';
import { AddressUserResponse } from '../response/address-user.response';

export interface UserAddressServiceGrpcClient {
  getUserAddress(
    getUserAddressRequest: GetAddressUserRequest,
  ): Observable<ApiResponse<AddressUserResponse>>;
}

export interface GetAddressUserRequest {
  id: number;
}
