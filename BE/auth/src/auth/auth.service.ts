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
import * as jwt from 'jsonwebtoken';
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
  async googleAuth(credential: string): Promise<ApiResponse<UserResponse>> {
    try {
      // Decode the Google credential token (JWT)
      const decoded = jwt.decode(credential) as any;
      console.log('🚀 ~ AuthService ~ googleAuth ~ decoded:', decoded);

      if (!decoded || !decoded.email) {
        throw new Error('Invalid Google credential');
      }

      // Extract user information from the decoded token
      const { email, name, picture } = decoded;
      const response = await lastValueFrom(
        this.userServiceGrpc.checkEmailExists({ email: email }),
      );

      // Check if user exists with this email
      try {
        // Try to find user by email
        if (response.status == HttpStatus.OK) {
          console.log('🚀 ~ AuthService ~ googleAuth ~ response:', response);
          if (response.data) {
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
          } else {
            const defaultPassword = '0000';
            const userSignupDto: UserSignupDto = {
              email: email,
              password: defaultPassword,
              username: name,
            };
            const response = await lastValueFrom(
              this.userServiceGrpc.signup(userSignupDto),
            );
            const accessToken = await this.accessToken(response.data);
            return createResponse(
              response.status,
              response.message,
              mapUserResponse(response.data, accessToken),
            );
          }
        } else {
          return createResponse(response.status, response.message, null);
        }
      } catch (error) {
        throw error;
      }
    } catch (error) {
      console.error('Google auth error:', error);
      throw new HttpException(
        'Xác thực Google thất bại: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private generateRandomPassword(length = 12): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  // Helper method to generate JWT token
  private generateJwtToken(user: any): string {
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });
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
