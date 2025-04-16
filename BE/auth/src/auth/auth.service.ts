import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UserServiceGrpcClient } from '../utils/interface/user-service.interface';
import { lastValueFrom } from 'rxjs';
import { UserSigninDto } from './dto/user-signin.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { ApiResponse } from 'src/utils/interface/response.interface';
import {
  UserResponse,
  mapUserResponse,
} from 'src/utils/response/user.response';
import { createResponse } from 'src/utils/response/response.util';
import { JwtService } from '@nestjs/jwt';
import { UpdateTokenDto } from './dto/update-token.dto';

@Injectable()
export class AuthService {
  private userServiceGrpc: UserServiceGrpcClient;
  constructor(
    @Inject('USER_PACKAGE') private readonly client: ClientGrpc,
    private jwtService: JwtService,
  ) {}
  onModuleInit() {
    this.userServiceGrpc =
      this.client.getService<UserServiceGrpcClient>('UserServiceGrpc');
  }

  async signin(
    userSignInDTO: UserSigninDto,
  ): Promise<ApiResponse<UserResponse>> {
    try {
      const response = await lastValueFrom(
        this.userServiceGrpc.signin(userSignInDTO),
      );
      if (response.status == HttpStatus.OK) {
        const accessToken = await this.accessToken(response.data);
        if (accessToken) {
          const updateAccessTokenData: UpdateTokenDto = {
            id: response.data.id,
            token: accessToken,
          };
          await this.updateAccessToken(updateAccessTokenData);
        }
        return createResponse(
          response.status,
          response.message,
          mapUserResponse(response.data, accessToken),
        );
      }
      return createResponse(response.status, response.message, null);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async signup(
    userSignupDto: UserSignupDto,
  ): Promise<ApiResponse<UserResponse>> {
    try {
      const response = await lastValueFrom(
        this.userServiceGrpc.signup(userSignupDto),
      );
      if (response.status == HttpStatus.OK) {
        return response;
      }
      return createResponse(response.status, response.message, null);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async accessToken(user: UserResponse) {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    };
    try {
      return await this.jwtService.signAsync(payload);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateAccessToken(updateTokenDto: UpdateTokenDto) {
    const response = await lastValueFrom(
      this.userServiceGrpc.updateAccessToken(updateTokenDto),
    );
  }
}
