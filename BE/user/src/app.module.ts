import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './utils/guards/authentication.guard';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { UserEntity } from './user/entities/user.entity';
import { AddressUserModule } from './address-user/address-user.module';
import { ValidateUserService } from './utils/validate/check-user.validate';
import { AddressUserEntity } from './address-user/entities/address-user.entity';
import { ProxyMiddleware } from './middleware/proxy.middleware';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([UserEntity, AddressUserEntity]),
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_SECRET_EXPIRE_TIME },
    }),
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'grpc.user.service',
          protoPath: join(__dirname, '../proto/user-service.proto'),
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
    AddressUserModule,
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
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(ProxyMiddleware).forRoutes('*'); // Sử dụng middleware cho tất cả các route hoặc có thể chỉ định route cụ thể
  // }
}
