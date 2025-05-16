import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrderService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { ClientsModule } from '@nestjs/microservices';
import {
  grpcMediaClientOptions,
  grpcProductClientOptions,
  grpcUserClientOptions,
} from 'src/grpc/grpc-client.options';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        ...grpcUserClientOptions,
      },
      {
        name: 'MEDIA_PACKAGE',
        ...grpcMediaClientOptions,
      },
      {
        name: 'PRODUCT_PACKAGE',
        ...grpcProductClientOptions,
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrderService],
})
export class OrdersModule {}
