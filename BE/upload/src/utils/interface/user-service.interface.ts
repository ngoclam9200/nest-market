import { Observable } from "rxjs";
import { ApiResponse } from "./response.interface";
import { UserResponse } from "../response/user.response";

export interface UserServiceGrpcClient {
 
  checkValidateToken( tokenRequest : TokenRequest) : Observable<ApiResponse<UserResponse>>;
  getUser( getUserRequest : GetUserRequest) : Observable<ApiResponse<UserResponse>>;
}
export interface TokenRequest {
  token: string;
  id:number;
}

export interface GetUserRequest {
  id:number;
}

