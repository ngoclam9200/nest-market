import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common';
import { createResponse } from './utils/response/response.util';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe(
      {
      whitelist: false,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const firstError = validationErrors[0];
        const constraints = firstError.constraints;
        const firstConstraint = constraints ? Object.values(constraints)[0] : 'Validation error';
        return new BadRequestException(createResponse(HttpStatus.BAD_REQUEST, firstConstraint, null));
      },
    }
    ),
  );
  

  app.setGlobalPrefix('api/v1')
  app.enableCors()
  const config = new DocumentBuilder()
    .setTitle('API Auth')
    .setDescription('The auth API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs/api', app, document);
  await app.listen(4201);
}
bootstrap();
