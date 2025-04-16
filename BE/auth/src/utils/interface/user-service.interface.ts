import { UserSigninDto } from "src/auth/dto/user-signin.dto";
import { UserSignupDto } from "src/auth/dto/user-signup.dto";
import { ApiResponse } from "./response.interface";
import { UserResponse } from "../response/user.response";
import { Observable } from "rxjs";
import { UpdateTokenDto } from "src/auth/dto/update-token.dto";

export interface UserServiceGrpcClient {
  signin(request: UserSigninDto): Observable<ApiResponse<UserResponse>>;
  signup( request : UserSignupDto) : Observable<ApiResponse<UserResponse>>;
  updateAccessToken(request : UpdateTokenDto)  : Observable<null>;
}

