import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from 'src/grpc/grpc-client.options';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaEntity } from './entities/media.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([MediaEntity]),
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        ...grpcClientOptions
      }
    ]),
  
  ],
  controllers: [MediaController, 
   
  ],
  providers: [MediaService],
})
export class MediaModule {}
