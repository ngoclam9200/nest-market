import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { HttpModule } from '@nestjs/axios';
config();

@Module({
  imports: [
    HttpModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_SECRET_EXPIRE_TIME },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
