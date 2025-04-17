import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { AuthenticationGuard } from 'src/utils/guards/authentication.guard';
import { ClientsModule } from '@nestjs/microservices';
import {
  grpcMediaClientOptions,
  grpcUserClientOptions,
} from 'src/grpc/grpc-client.options';
import { BannerEntity } from './entities/banner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([BannerEntity]),
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        ...grpcUserClientOptions,
      },
      {
        name: 'MEDIA_PACKAGE',
        ...grpcMediaClientOptions,
      },
    ]),
  ],
  controllers: [BannerController],
  providers: [BannerService, AuthenticationGuard],
})
export class BannerModule {}
