import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcUserClientOptions: ClientOptions = {
  
  transport: Transport.GRPC,
  options: {
    url: 'localhost:1000', // Replace with your actual service URL
    package: 'grpc.user.service', // Name of the package defined in your auth.proto file
    protoPath:  join(__dirname, '../..', '/proto', 'user-service.proto'),
    
    loader:{
      keepCase:true,
    }
  },
};

export const grpcMediaClientOptions: ClientOptions = {
  
  transport: Transport.GRPC,
  options: {
    url: 'localhost:2000', // Replace with your actual service URL
    package: 'grpc.media.service', // Name of the package defined in your auth.proto file
    protoPath:  join(__dirname, '../..', '/proto', 'media-service.proto'),
    
    loader:{
      keepCase:true,
    }
  },
};
