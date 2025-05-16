import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcUserClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:1000', // Replace with your actual service URL
    package: ['grpc.user.service' , "grpc.user.address.service"], // Name of the package defined in your auth.proto file
    protoPath: [
      join(__dirname, '../..', '/proto', 'user-service.proto'),
      join(__dirname, '../..', '/proto', 'user-address-service.proto'),
    ],

    loader: {
      keepCase: true,
    },
  },
};

export const grpcMediaClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:2000', // Replace with your actual service URL
    package: 'grpc.media.service', // Name of the package defined in your auth.proto file
    protoPath: join(__dirname, '../..', '/proto', 'media-service.proto'),

    loader: {
      keepCase: true,
    },
  },
};

export const grpcProductClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:3000', // Replace with your actual service URL
    package: 'grpc.product.service', // Name of the package defined in your auth.proto file
    protoPath: join(__dirname, '../..', '/proto', 'product-service.proto'),

    loader: {
      keepCase: true,
    },
  },
};
