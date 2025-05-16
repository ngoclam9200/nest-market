import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiResponse,
  PaginatedResponse,
} from 'src/utils/interface/response.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  createPaginatedResponse,
  createResponse,
} from 'src/utils/response/response.util';
import { UserResponse } from 'src/utils/response/user.response';
import { UserServiceGrpcClient } from 'src/utils/interface/user-service.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';
import { OrderEntity } from './entities/order.entity';

import { CreateOrderDto } from './dto/create-order.dto';

import { ProductServiceGrpcClient } from 'src/utils/interface/product-service.interface';
import { ProductResponse } from 'src/utils/response/product.response';
import { AddressUserResponse } from 'src/utils/response/address-user.response';
import { UserAddressServiceGrpcClient } from 'src/utils/interface/user-address-service.interface';
import {
  ORDER_STATUS_ENUM,
  TRANSACTION_TYPE_ENUM,
} from 'src/utils/common/value.enum';
import {
  mapOrderResponse,
  OrderResponse,
} from 'src/utils/response/order.response';
import { TransactionResponse } from 'src/utils/response/transaction.response';

@Injectable()
export class OrderService {
  private userServiceGrpc: UserServiceGrpcClient;
  private productServiceGrpc: ProductServiceGrpcClient;
  private userAddressServiceGrpc: UserAddressServiceGrpcClient;

  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @Inject('USER_PACKAGE') private readonly userClient: ClientGrpc,
    @Inject('PRODUCT_PACKAGE') private readonly productClient: ClientGrpc,
  ) {}
  onModuleInit() {
    this.userServiceGrpc =
      this.userClient.getService<UserServiceGrpcClient>('UserServiceGrpc');
    this.productServiceGrpc =
      this.productClient.getService<ProductServiceGrpcClient>(
        'ProductServiceGrpc',
      );
    this.userAddressServiceGrpc =
      this.userClient.getService<UserAddressServiceGrpcClient>(
        'UserAddressServiceGrpc',
      );
  }

  async getOrdersByUserId(
    currentUser: UserResponse,
    page: number = 1,
    limit: number = 10,
    status: number = -1,
  ): Promise<ApiResponse<PaginatedResponse<OrderResponse>>> {
    try {
      // Build where conditions
      const whereConditions: any = { user_id: currentUser.id };
      // Add status filter if provided (not -1)
      if (status !== -1) {
        whereConditions.status = status;
      }

      const [orders, total_record] = await this.orderRepository.findAndCount({
        where: whereConditions,
        order: { created_at: 'DESC' },
        skip: (page - 1) * limit,
        take: limit,
      });

      let address: ApiResponse<AddressUserResponse> = await lastValueFrom(
        this.userAddressServiceGrpc.getUserAddress({
          id: currentUser.id,
        }),
      );

      const mapOrders = await Promise.all(
        orders.map(async (order) => {
          const listProductIds = order.products.map(
            (product) => product.product_id,
          );
          const list_product = await lastValueFrom(
            this.productServiceGrpc.getProductsByIds({
              product_ids: listProductIds,
            }),
          );

          const traction: TransactionResponse = {
            id: order.transaction_type,
            name: await this.transactionName(order.transaction_type),
          };
          return mapOrderResponse(
            order,
            list_product.data,
            currentUser,
            address.data,
            traction,
          );
        }),
      );

      // Return paginated response
      return createPaginatedResponse(
        HttpStatus.OK,
        'Lấy danh sách đơn hàng thành công',
        mapOrders,
        total_record,
        page,
        limit,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    currentUser: UserResponse,
  ): Promise<ApiResponse<OrderResponse>> {
    try {
      const listProductIds = createOrderDto.products.map(
        (product) => product.product_id,
      );
      let productResponse: ApiResponse<ProductResponse[]> = await lastValueFrom(
        this.productServiceGrpc.getProductsByIds({
          product_ids: listProductIds,
        }),
      );

      if (productResponse.data && productResponse.status == HttpStatus.OK) {
        let addressUserResponse: ApiResponse<AddressUserResponse> =
          await lastValueFrom(
            this.userAddressServiceGrpc.getUserAddress({
              id: createOrderDto.address_user_id,
            }),
          );

        if (addressUserResponse.data && addressUserResponse.data.id) {
          let order = this.orderRepository.create({
            user_id: currentUser.id,
            products: createOrderDto.products,
            address_user_id: createOrderDto.address_user_id,
            total_price: createOrderDto.total_price,
            transaction_type: createOrderDto.transaction_type,
            description: createOrderDto.description,
            status: ORDER_STATUS_ENUM.PENDING,
          });
          await this.orderRepository.save(order);
          await lastValueFrom(
            this.productServiceGrpc.updateStockProduct({
              order_product_items: createOrderDto.products,
              increase: 0,
            }),
          );
          return createResponse(HttpStatus.OK, 'Tạo đơn hàng thành công', null);
        } else {
          throw new NotFoundException('Địa chỉ không tồn tại');
        }
      } else {
        throw new BadRequestException(productResponse.message);
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async transactionName(transaction_type: number) {
    switch (transaction_type) {
      case TRANSACTION_TYPE_ENUM.COD:
        return 'COD';
      case TRANSACTION_TYPE_ENUM.PAYPAL:
        return 'PAYPAL';
      case TRANSACTION_TYPE_ENUM.VNPAY:
        return 'VNPAY';
      default:
        return '';
    }
  }

  async changeStatus(id: number, status: number) {
    // : Promise<ApiResponse<OrderResponse>>
    // const order = await this.orderRepository.findOne({
    //   where: { id: id },
    // });
    // if (!order) throw new NotFoundException('Sản phẩm không tồn tại');
    // order.status = status;
    // await this.orderRepository.save(order); // Lưu vào database
    // let user_created: ApiResponse<UserResponse> = await lastValueFrom(
    //   this.userServiceGrpc.getUser({ id: order.user_id_created }),
    // );
    // let user_updated: ApiResponse<UserResponse> = await lastValueFrom(
    //   this.userServiceGrpc.getUser({ id: order.user_id_updated }),
    // );
    // let list_media: ApiResponse<MediaResponse[]> = await lastValueFrom(
    //   this.mediaServiceGrpc.getMediasByIds({
    //     media_ids: order.list_media_id,
    //   }),
    // );
    // if (list_media.status != HttpStatus.OK) {
    //   throw new BadRequestException(list_media.message);
    // }
    // const category = await this.categoryRepository.findOne({
    //   where: { id: order.category_id },
    // });
    // return createResponse(
    //   HttpStatus.OK,
    //   'OK',
    //   mapOrderResponseWithAdmin(
    //     order,
    //     user_created.data,
    //     user_updated.data,
    //     list_media.data,
    //     category,
    //   ),
    // );
  }
}
