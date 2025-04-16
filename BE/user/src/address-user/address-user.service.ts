import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAddressUserDto } from './dto/create-address-user.dto';
import { UpdateAddressUserDto } from './dto/update-address-user.dto';
import { ApiResponse } from 'src/utils/interface/response.interface';
import { AddressUserEntity } from './entities/address-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValidateUserService } from 'src/utils/validate/check-user.validate';
import { UserEntity } from 'src/user/entities/user.entity';
import { createResponse } from 'src/utils/response/response.util';
import { UpdateAddressDefaultDto } from './dto/update-address-default.dto';
import { DeleteAddressDto } from './dto/delete-address.dto';

@Injectable()
export class AddressUserService {
  constructor(   @InjectRepository(AddressUserEntity)
  private addressUserRepository: Repository<AddressUserEntity>,
  private validateUserService: ValidateUserService
){

  }
  async createAddress(createAddressDto: CreateAddressUserDto, currentUser :UserEntity): Promise<ApiResponse<AddressUserEntity>> {
    try {
      if (!this.validateUserService.checkRoleAndCurrentUser(currentUser, createAddressDto.user_id)) throw new UnauthorizedException('Bạn không có quyền thêm mới địa chỉ')
      if(createAddressDto.is_default){
        const listAddress = await this.addressUserRepository.find({ where: { user_id: createAddressDto.user_id } });
        listAddress.map(address=>{
          if(address.is_default){
            address.is_default=false
            this.addressUserRepository.save(address)
          }
        })
      }
      let address = this.addressUserRepository.create(createAddressDto);
      address = await this.addressUserRepository.save(address)

      return createResponse(HttpStatus.OK, 'OK', address)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

  }

  async updateAddress(updateAddressDto: UpdateAddressUserDto, currentUser :UserEntity): Promise<ApiResponse<AddressUserEntity>> {
    try {
      const address = await this.addressUserRepository.findOne({ where: { 'id': updateAddressDto.id } })
      if (!address) throw new NotFoundException('Địa chỉ không tồn tại');

      if (!this.validateUserService.checkRoleAndCurrentUser(currentUser, address.user_id)) throw new UnauthorizedException('Bạn không có quyền chỉnh sửa địa chỉ')
      if(updateAddressDto.is_default){
        const listAddress = await this.addressUserRepository.find({ where: { user_id: address.user_id } });
        listAddress.map(address=>{
          if(address.is_default){
            address.is_default=false
            this.addressUserRepository.save(address)
          }
        })
      }
      Object.assign(address, updateAddressDto)
      await this.addressUserRepository.save(address)
      return createResponse(HttpStatus.OK, 'OK', address)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

  }

  async updateAddressDefault(updateAddressDefaultDto: UpdateAddressDefaultDto, currentUser :UserEntity): Promise<ApiResponse<AddressUserEntity>> {
    try {
      const address = await this.addressUserRepository.findOne({ where: { 'id': updateAddressDefaultDto.id } })
      if (!address) throw new NotFoundException('Địa chỉ không tồn tại');
      if (!this.validateUserService.checkRoleAndCurrentUser(currentUser, address.user_id)) throw new UnauthorizedException('Bạn không có quyền chỉnh sửa địa chỉ')
        const listAddress = await this.addressUserRepository.find({ where: { user_id: address.user_id } });
        listAddress.map(address=>{
          if(address.is_default){
            address.is_default=false
            this.addressUserRepository.save(address)
          }
        })
     
      address.is_default=true;
      await this.addressUserRepository.save(address)
      return createResponse(HttpStatus.OK, 'OK', address)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

  }

  async deleteAddress(deleteAddressDto: DeleteAddressDto, currentUser :UserEntity): Promise<ApiResponse<AddressUserEntity>> {
    try {
      const address = await this.addressUserRepository.findOne({ where: { 'id': deleteAddressDto.id } })
      if (!address) throw new NotFoundException('Địa chỉ không tồn tại');
      if (!this.validateUserService.checkRoleAndCurrentUser(currentUser, address.user_id)) throw new UnauthorizedException('Bạn không có quyền thêm mới địa chỉ')
      if(address.is_default){
          const address_to_default=await this.addressUserRepository.findOne({ where: { 'id': deleteAddressDto.id_address_default } })
          if (!address_to_default) throw new NotFoundException('Địa chỉ không tồn tại');
          address_to_default.is_default=true;
          await this.addressUserRepository.save(address_to_default)
      }
      await this.addressUserRepository.delete(address)
      return createResponse(HttpStatus.OK, 'OK', null)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

  }

}
