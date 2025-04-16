import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BadRequestException, HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common';
import { createResponse } from './utils/response/response.util';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe(
      {
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
  // app.()
  const config = new DocumentBuilder()
    .setTitle('API Product Service')
    .setDescription('The product service API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs/api', app, document);
  
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'grpc.user.service',
  //     url:'0.0.0.0:1000',
  //     protoPath:[
  //       join(__dirname, '..', 'proto', 'user-service.proto'),
  //     ], 
  //     loader:{
  //       keepCase:true
  //     }  
  //   },
  // });
  await app.startAllMicroservices();
  await app.listen(4203);
}
bootstrap();
