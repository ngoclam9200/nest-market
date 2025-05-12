import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseFilters,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { UserEntity } from './entities/user.entity';

import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';
import { HttpExceptionFilter } from 'src/utils/exceptions/http.exception';
import { CurrentUser } from 'src/utils/decorators/current-user.decorator';
import {
  ApiResponse,
  PaginatedResponse,
} from 'src/utils/interface/response.interface';
import { UserSigninDto } from './dto/user-signin.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { PageLimitDto } from './dto/page-limit.dto';
import { AuthenticationGuard } from 'src/utils/guards/authentication.guard';
import { PublicAPI } from 'src/utils/decorators/authorize-roles.decorator';
import { UpdateTokenDto } from './dto/update-token.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthorizeGuard } from 'src/utils/guards/authorization.guard';

@ApiTags('users')
@Controller('users')
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthenticationGuard)
@ApiBearerAuth('access-token')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get('all')
  @UseGuards(AuthorizeGuard(['admin']))
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  async findAllUser(
    @Query() page_limit: PageLimitDto,
  ): Promise<ApiResponse<PaginatedResponse<UserEntity>>> {
    const { page, limit } = page_limit;
    try {
      return await this.usersService.findAllUser(page, limit);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('profile')
  async getProfile(@CurrentUser() currentUser: any) {
    try {
      return await this.usersService.findOneUser(+currentUser.id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, type: Number })
  async findOneUser(@Param('id') id: number): Promise<ApiResponse<UserEntity>> {
    try {
      return await this.usersService.findOneUser(+id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @PublicAPI()
  @GrpcMethod('UserServiceGrpc', 'getUser')
  async getUser(getUserRequest: {
    id: number;
  }): Promise<ApiResponse<UserEntity>> {
    try {
      return await this.usersService.getUser(+getUserRequest.id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @PublicAPI()
  @GrpcMethod('UserServiceGrpc', 'getUsersByIds')
  async getUsersByIds(getUsersByIdsRequest: {
    user_ids: number[];
  }): Promise<ApiResponse<UserEntity[]>> {
    try {
      return await this.usersService.getUsersByIds(
        getUsersByIdsRequest.user_ids,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('update')
  async updateProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    try {
      return await this.usersService.updateProfile(
        updateProfileDto,
        currentUser,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @PublicAPI()
  @GrpcMethod('UserServiceGrpc', 'signin')
  async signin(userSigninDto: UserSigninDto): Promise<ApiResponse<UserEntity>> {
    try {
      return await this.usersService.signin(userSigninDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @PublicAPI()
  @GrpcMethod('UserServiceGrpc', 'checkEmailExists')
  async checkEmailExists(request: {email: string}): Promise<ApiResponse<boolean>> {
    try {
      return await this.usersService.checkEmailExists(request);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @PublicAPI()
  @GrpcMethod('UserServiceGrpc', 'signup')
  async signup(
    @Body() userSignupDto: UserSignupDto,
  ): Promise<ApiResponse<UserEntity>> {
    try {
      return await this.usersService.signup(userSignupDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @PublicAPI()
  @GrpcMethod('UserServiceGrpc', 'updateAccessToken')
  async updateAccesstoken(updateTokenDto: UpdateTokenDto) {
    try {
      return await this.usersService.updateAccessToken(updateTokenDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @PublicAPI()
  @GrpcMethod('UserServiceGrpc', 'checkValidateToken')
  async checkValidateToken(
    @Body() tokenRequest: { token: string; id: number },
  ) {
    try {
      return await this.usersService.checkValidateToken(tokenRequest);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
