import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaModule } from './media/media.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from './grpc/grpc-client.options';
import { dataSourceOptions } from 'db/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
config();

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    MediaModule,
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_SECRET_EXPIRE_TIME },
    }),
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
