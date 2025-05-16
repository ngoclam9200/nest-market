import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { HttpExceptionFilter } from 'src/utils/exceptions/http.exception';
import { AuthenticationGuard } from 'src/utils/guards/authentication.guard';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  ApiResponse,
  PaginatedResponse,
} from 'src/utils/interface/response.interface';

import { CurrentUser } from 'src/utils/decorators/current-user.decorator';
import { UserResponse } from 'src/utils/response/user.response';
import { OrderService } from './orders.service';
import { GetOrderDTO } from './dto/get-order.dto';
import { OrderResponse } from 'src/utils/response/order.response';
import { OrderEntity } from './entities/order.entity';

@Controller('order')
@ApiTags('order')
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthenticationGuard)
@ApiBearerAuth('access-token')
export class OrdersController {
  constructor(private readonly ordersService: OrderService) {}

  @Get('get-order')
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'status', required: false, type: Number, example: -1 })
  async getOrdersByUserId(
    @Query() getOrderDTO: GetOrderDTO,
    @CurrentUser() currentUser: UserResponse,
  ): Promise<ApiResponse<PaginatedResponse<OrderResponse>>> {
    const { page, limit, status } = getOrderDTO;
    try {
      return await this.ordersService.getOrdersByUserId(
        currentUser,
        page,
        limit,
        status,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }


  @Post('create')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() currentUser: UserResponse,
  ) {
    try {
      return await this.ordersService.createOrder(createOrderDto, currentUser);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // @Post('update')
  // async updateOrder(
  //   @Body() updateOrderDto: UpdateOrderDto,
  //   @CurrentUser() currentUser: UserResponse,
  // ) {
  //   try {
  //     return await this.ordersService.updateOrder(updateOrderDto, currentUser);
  //   } catch (error) {
  //     throw new HttpException(error, HttpStatus.BAD_REQUEST);
  //   }
  // }

  @Post('change-status')
  async changeStatus(@Body('id') id: number, @Body('status') status: number) {
    return this.ordersService.changeStatus(id, status);
  }
}
