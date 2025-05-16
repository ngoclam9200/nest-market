import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from 'db/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '@nestjs/microservices';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './utils/guards/authentication.guard';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import {
  grpcProductClientOptions,
  grpcUserClientOptions,
} from './grpc/grpc-client.options';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
config();
@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_SECRET_EXPIRE_TIME },
    }),
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        ...grpcUserClientOptions,
      },

      {
        name: 'PRODUCT_PACKAGE',
        ...grpcProductClientOptions
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true, // Điều này sẽ làm cho ConfigService khả dụng toàn cầu
    }),
    OrdersModule
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
})
export class AppModule {}
