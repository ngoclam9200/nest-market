import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpStatus, HttpException, Inject } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../decorators/authorize-roles.decorator';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientGrpc } from '@nestjs/microservices';
import { UserServiceGrpcClient } from '../interface/user-service.interface';
import { lastValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthenticationGuard implements CanActivate {
  private userServiceGrpc: UserServiceGrpcClient
  constructor(
    private jwtService: JwtService,
    @Inject('USER_PACKAGE') private readonly client: ClientGrpc,
    private reflector: Reflector,
  ) { }
  onModuleInit() {
    this.userServiceGrpc = this.client.getService<UserServiceGrpcClient>('UserServiceGrpc');
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    type === 'Bearer' ? token : undefined;

    if (!token) {
      throw new UnauthorizedException('Token không hợp lệ');
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.ACCESS_TOKEN_SECRET_KEY
        }
      );
      const response = await lastValueFrom(this.userServiceGrpc.checkValidateToken({ token: token, id: payload.id }));
      if (response.data) {
        request['currentUser'] = response.data;
        return true;
      } else {
        throw new UnauthorizedException('Token không hợp lệ');
      }
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}

