import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AddressUserService } from './address-user.service';
import { CreateAddressUserDto } from './dto/create-address-user.dto';
import { UpdateAddressUserDto } from './dto/update-address-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/utils/exceptions/http.exception';
import { AuthenticationGuard } from 'src/utils/guards/authentication.guard';
import { CurrentUser } from 'src/utils/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { UpdateAddressDefaultDto } from './dto/update-address-default.dto';
import { DeleteAddressDto } from './dto/delete-address.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { PublicAPI } from 'src/utils/decorators/authorize-roles.decorator';
import { ApiResponse } from 'src/utils/interface/response.interface';
import { AddressUserEntity } from './entities/address-user.entity';

@ApiTags('Address User')
@Controller('address-user')
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthenticationGuard)
@ApiBearerAuth('access-token')
export class AddressUserController {
  constructor(private readonly addressUserService: AddressUserService) {}

  @Get('default')
  async getAddressDefault(@CurrentUser() currentUser: UserEntity) {
    try {
      return await this.addressUserService.getAddressDefault(currentUser.id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('create')
  async createAddress(
    @Body() createAddressDto: CreateAddressUserDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    try {
      return await this.addressUserService.createAddress(
        createAddressDto,
        currentUser,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('update')
  async updateAddress(
    @Body() updateAddressDto: UpdateAddressUserDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    try {
      return await this.addressUserService.updateAddress(
        updateAddressDto,
        currentUser,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @PublicAPI()
  @GrpcMethod('UserAddressServiceGrpc', 'getUserAddress')
  async getUserAddress(getUserAddressRequest: {
    id: number;
  }): Promise<ApiResponse<AddressUserEntity>> {
    try {
      return await this.addressUserService.getUserAddress(
        getUserAddressRequest.id,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('update-address-default')
  async updateAddressDefault(
    @Body() updateAddressDefault: UpdateAddressDefaultDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    try {
      return await this.addressUserService.updateAddressDefault(
        updateAddressDefault,
        currentUser,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('delete-address-default')
  async deleteAddress(
    @Body() deleteAddressDto: DeleteAddressDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    try {
      return await this.addressUserService.deleteAddress(
        deleteAddressDto,
        currentUser,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
