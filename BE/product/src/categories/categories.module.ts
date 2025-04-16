import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { AuthenticationGuard } from 'src/utils/guards/authentication.guard';
import { ClientsModule } from '@nestjs/microservices';
import { grpcMediaClientOptions, grpcUserClientOptions } from 'src/grpc/grpc-client.options';
import { CategoryEntity } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[  TypeOrmModule.forFeature([CategoryEntity]),
     ClientsModule.register([
    {
      name: 'USER_PACKAGE',
      ...grpcUserClientOptions
    }, 
    {
      name: 'MEDIA_PACKAGE',
      ...grpcMediaClientOptions
    }, 

  ]), ],
  controllers: [CategoriesController],
  providers: [CategoriesService, AuthenticationGuard],
})
export class CategoriesModule {} 
