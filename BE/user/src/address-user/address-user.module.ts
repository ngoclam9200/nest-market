import { Module } from '@nestjs/common';
import { AddressUserService } from './address-user.service';
import { AddressUserController } from './address-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressUserEntity } from './entities/address-user.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ValidateUserService } from 'src/utils/validate/check-user.validate';

@Module({
  imports:[ TypeOrmModule.forFeature([AddressUserEntity, UserEntity]),],
  controllers: [AddressUserController],
  providers: [AddressUserService, ValidateUserService],
  exports:[ValidateUserService],

})
export class AddressUserModule {}
