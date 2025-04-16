import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ValidateUserService } from 'src/utils/validate/check-user.validate';
 

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
   
  ],
  controllers: [UsersController],
  providers: [UserService, ValidateUserService],
  exports:[ValidateUserService],
})
export class UserModule { }
