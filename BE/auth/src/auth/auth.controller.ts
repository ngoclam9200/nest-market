import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GrpcMethod } from '@nestjs/microservices';
import { PublicAPI } from 'src/utils/decorators/authorize-roles.decorator';
import { ApiResponse } from 'src/utils/interface/response.interface';
import { UserSigninDto } from './dto/user-signin.dto';
import { AuthService } from './auth.service';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserResponse } from 'src/utils/response/user.response';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @PublicAPI()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(
    @Body() body: UserSigninDto,
  ): Promise<ApiResponse<UserResponse>> {
    try {
      return await this.authService.signin(body);
    } catch (error) {
      throw new HttpException(
        'Đã có lỗi xảy ra' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @PublicAPI()
  @Post('signup')
  async signup(
    @Body() userSignupDto: UserSignupDto,
  ): Promise<ApiResponse<UserResponse>> {
    try {
      return await this.authService.signup(userSignupDto);
    } catch (error) {
      throw new HttpException(
        'Đã có lỗi xảy ra' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @PublicAPI()
  @Post('login-google')
  async googleAuth(
    @Body() body: { credential: string },
  ): Promise<ApiResponse<UserResponse>> {
    try {
      return await this.authService.googleAuth(body.credential);
    } catch (error) {
      throw new HttpException(
        'Đã có lỗi xảy ra' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
