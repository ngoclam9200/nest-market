import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { mapUserResponse } from 'src/utils/response/user.response';
import {
  createPaginatedResponse,
  createResponse,
} from 'src/utils/response/response.util';
import {
  ApiResponse,
  PaginatedResponse,
} from 'src/utils/interface/response.interface';
import { UserSigninDto } from './dto/user-signin.dto';
import { hash, compare } from 'bcrypt';

import { UserSignupDto } from './dto/user-signup.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ValidateUserService } from 'src/utils/validate/check-user.validate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private validateUserService: ValidateUserService,
  ) {}

  async findAllUser(
    page: number = 1,
    limit: number = 10,
  ): Promise<ApiResponse<PaginatedResponse<UserEntity>>> {
    try {
      const [list, total_record] = await this.usersRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });
      const mappedUsers = list.map((user) => mapUserResponse(user));
      return createPaginatedResponse(
        HttpStatus.OK,
        'OK',
        mappedUsers,
        total_record,
        page,
        limit,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneUser(id: number): Promise<ApiResponse<UserEntity>> {
    try {
      const user = await this.usersRepository.findOne({ where: { id: id } });
      if (!user) throw new NotFoundException('Người dùng không tồn tại');
      return createResponse(HttpStatus.OK, 'OK', mapUserResponse(user));
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getUser(id: number): Promise<ApiResponse<UserEntity>> {
    try {
      const user = await this.usersRepository.findOne({ where: { id: id } });
      if (!user)
        return createResponse(
          HttpStatus.BAD_REQUEST,
          'Người dùng không tồn tại',
          null,
        );
      return createResponse(HttpStatus.OK, 'OK', mapUserResponse(user));
    } catch (error) {
      return createResponse(HttpStatus.BAD_REQUEST, error, null);
    }
  }

  async getUsersByIds(user_ids: number[]): Promise<ApiResponse<UserEntity[]>> {
    try {
      const find_user = user_ids.map(async (user_id) => {
        const user = await this.usersRepository.findOne({
          where: { id: user_id },
        });
        return user;
      });
      const list_user = await Promise.all(find_user);
      return createResponse(HttpStatus.OK, 'OK', list_user);
    } catch (error) {
      return createResponse(HttpStatus.BAD_REQUEST, error, null);
    }
  }

  async checkEmailExists(request: {
    email: string;
  }): Promise<ApiResponse<boolean>> {
    console.log('🚀 ~ UserService ~ checkEmailExists ~ email:', request);
    try {
      const user = await this.usersRepository.findOne({
        where: { email: request.email },
      });
      console.log("🚀 ~ UserService ~ user:", user)
      return createResponse(HttpStatus.OK, 'OK', user);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateProfile(
    updateProfileDto: UpdateProfileDto,
    currentUser: UserEntity,
  ) {
    try {
      if (
        !this.validateUserService.checkRoleAndCurrentUser(
          currentUser,
          updateProfileDto.id,
        )
      )
        throw new UnauthorizedException('Bạn không có quyền chỉnh sửa');
      const userExist = await this.findUserByEmail(updateProfileDto.email);
      if (userExist && userExist.id != updateProfileDto.id)
        return createResponse(HttpStatus.BAD_REQUEST, 'Email đã tồn tại', null);
      const user = await this.usersRepository.findOne({
        where: { id: updateProfileDto.id },
      });
      if (!user) throw new NotFoundException('Người dùng không tồn tại');
      Object.assign(user, updateProfileDto);
      await this.usersRepository.save(user);
      return createResponse(HttpStatus.OK, 'OK', mapUserResponse(user));
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async signin(userSigninDto: UserSigninDto): Promise<ApiResponse<UserEntity>> {
    try {
      const userExist = await this.findUserByEmail(userSigninDto.email);
      if (!userExist) {
        return createResponse(
          HttpStatus.BAD_REQUEST,
          'Sai mật khẩu hoặc tài khoản',
          null,
        );
      }

      const matchPassword = await compare(
        userSigninDto.password,
        userExist.password,
      );
      if (!matchPassword) {
        return createResponse(
          HttpStatus.BAD_REQUEST,
          'Sai mật khẩu hoặc tài khoản',
          null,
        );
      }
      return createResponse(HttpStatus.OK, 'OK', userExist);
    } catch (error) {
      return createResponse(HttpStatus.BAD_REQUEST, error, null);
    }
  }

  async signup(userSignupDto: UserSignupDto): Promise<ApiResponse<UserEntity>> {
    try {
      const userExist = await this.findUserByEmail(userSignupDto.email);
      if (userExist)
        return createResponse(HttpStatus.BAD_REQUEST, 'Email đã tồn tại', null);
      userSignupDto.password = await hash(userSignupDto.password, 10);
      let user = this.usersRepository.create(userSignupDto);
      user = await this.usersRepository.save(user);
      return createResponse(HttpStatus.OK, 'OK', mapUserResponse(user));
    } catch (error) {
      return createResponse(HttpStatus.BAD_REQUEST, error, null);
    }
  }

  async findUserByEmail(email: string) {
    try {
      return await this.usersRepository.findOneBy({ email });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateAccessToken(updateTokenDto: UpdateTokenDto) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: updateTokenDto.id },
      });
      if (user) {
        user.access_token = updateTokenDto.token;
        this.usersRepository.save(user);
      }
    } catch (error) {
      return createResponse(HttpStatus.BAD_REQUEST, error, null);
    }
  }

  async checkValidateToken(TokenRequest: { token: string; id: number }) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: TokenRequest.id, access_token: TokenRequest.token },
      });
      return await createResponse(HttpStatus.OK, 'Token User', user);
    } catch (error) {
      return createResponse(HttpStatus.BAD_REQUEST, error, null);
    }
  }
}
