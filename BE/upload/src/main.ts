import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { createResponse } from './utils/response/response.util';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as path from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const firstError = validationErrors[0];
        const constraints = firstError.constraints;
        const firstConstraint = constraints
          ? Object.values(constraints)[0]
          : 'Validation error';
        return new BadRequestException(
          createResponse(HttpStatus.BAD_REQUEST, firstConstraint, null),
        );
      },
    }),
  );

  app.setGlobalPrefix('api/v1');
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('API User Service')
    .setDescription('The user service API description')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer' }, 'access-token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs/api', app, document);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'grpc.media.service',
      url: '0.0.0.0:2000',
      protoPath: [join(__dirname, '..', 'proto', 'media-service.proto')],
      loader: {
        keepCase: true,
      },
    },
  });
  app.useStaticAssets('storage-media', {
    prefix: '/storage-media/',
  });

  await app.startAllMicroservices();
  await app.listen(4204);
}
bootstrap();
