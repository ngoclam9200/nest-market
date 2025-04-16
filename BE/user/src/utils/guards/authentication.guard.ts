import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../decorators/authorize-roles.decorator';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
 

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private  jwtService: JwtService, 
    private reflector: Reflector,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>

  ) {}
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
      
      const user = await this.userRepository.findOne({ where: { id: payload.id } });
      if (!user || user.access_token !== token) {
        throw new UnauthorizedException('Token không hợp lệ');
      }
      request['currentUser'] = payload;  
      return true;    
    } catch(err) {
      throw new UnauthorizedException(err);
    }
  }
}

