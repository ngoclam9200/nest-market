import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import {
  ApiResponse,
  PaginatedResponse,
} from 'src/utils/interface/response.interface';
import {
  BannerResponse,
  mapBannerResponse,
} from 'src/utils/response/banner.response';
import { InjectRepository } from '@nestjs/typeorm';
import { BannerEntity } from './entities/banner.entity';
import { In, IsNull, Not, Repository } from 'typeorm';
import { createResponse } from 'src/utils/response/response.util';
import { UserResponse } from 'src/utils/response/user.response';
import { UserServiceGrpcClient } from 'src/utils/interface/user-service.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { MediaServiceGrpcClient } from 'src/utils/interface/media-service.interface';
import { GetTypeEnum } from 'src/utils/common/value.enum';
import { Roles } from 'src/utils/common/user-roles.enum';
import { mapResponseMediaDefault } from 'src/utils/response/media.response';
import { DeleteBannerDto } from './dto/delete-banner.dto';

@Injectable()
export class BannerService {
  private userServiceGrpc: UserServiceGrpcClient;
  private mediaServiceGrpc: MediaServiceGrpcClient;
  constructor(
    @InjectRepository(BannerEntity)
    private bannerRepository: Repository<BannerEntity>,
    @Inject('USER_PACKAGE') private readonly userClient: ClientGrpc,
    @Inject('MEDIA_PACKAGE') private readonly mediaClient: ClientGrpc,
  ) {}
  onModuleInit() {
    this.userServiceGrpc =
      this.userClient.getService<UserServiceGrpcClient>('UserServiceGrpc');
    this.mediaServiceGrpc =
      this.mediaClient.getService<MediaServiceGrpcClient>('MediaServiceGrpc');
  }

  async findAllBanner(
    status: number = GetTypeEnum.NOT_DELETED,
  ): Promise<ApiResponse<PaginatedResponse<BannerResponse>>> {
    try {
      const get_all: any = {};
      if (status === GetTypeEnum.ALL) {
        get_all.status = In([0, 1]);
      } else {
        get_all.status = status;
      }

      const list = await this.bannerRepository.find({
        where: get_all,
        order: { id: 'DESC' },
      });

      const listBannerMediaIds = list.map((item) => item.media_id);

      const listUserCreatedIds = list.map((item) => item.user_id_created);
      const listUserUpdatedIds = list.map((item) => item.user_id_created);
      const list_media = await lastValueFrom(
        this.mediaServiceGrpc.getMediasByIds({
          media_ids: listBannerMediaIds,
        }),
      );
      const list_user_created = await lastValueFrom(
        this.userServiceGrpc.getUsersByIds({ user_ids: listUserCreatedIds }),
      );

      const list_user_updated = await lastValueFrom(
        this.userServiceGrpc.getUsersByIds({ user_ids: listUserUpdatedIds }),
      );

      const mappedCateWithUserCreated = await Promise.all(
        list.map(async (banner) => {
          let media = list_media.data.find(
            (item) => item.id === banner.media_id,
          );
          if (!media) media = mapResponseMediaDefault(banner.media_id);

          const user_created = list_user_created.data.find(
            (item) => item.id === banner.user_id_created,
          );
          const user_updated = list_user_updated.data.find(
            (item) => item.id === banner.user_id_updated,
          );

          return mapBannerResponse(banner, media , user_created, user_updated);
        }),
      );

      return createResponse(HttpStatus.OK, 'OK', mappedCateWithUserCreated);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async createBanner(
    createBannerDto: CreateBannerDto,
    currentUser: UserResponse,
  ): Promise<ApiResponse<BannerResponse>> {
    try {
      const media = await lastValueFrom(
        this.mediaServiceGrpc.getMedia({
          media_id: createBannerDto.media_id,
        }),
      );
      if (media.status === HttpStatus.BAD_REQUEST) {
        throw new NotFoundException('Media không tồn tại');
      }

      let banner = this.bannerRepository.create(createBannerDto);
      banner.user_id_created = currentUser.id;
      banner.user_id_updated = currentUser.id;
      banner.status = 1;

      const data = await this.bannerRepository.save(banner);
      return createResponse(
        HttpStatus.OK,
        'OK',
        mapBannerResponse(data, media.data),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateBanner(
    updateBannerDto: UpdateBannerDto,
    currentUser: UserResponse,
  ): Promise<ApiResponse<BannerResponse>> {
    try {
      const banner = await this.bannerRepository.findOne({
        where: { id: updateBannerDto.id },
      });
      if (!banner) throw new NotFoundException('Danh mục không tồn tại');
      const media = await lastValueFrom(
        this.mediaServiceGrpc.getMedia({
          media_id: updateBannerDto.media_id,
        }),
      );
      if (media.status === HttpStatus.BAD_REQUEST) {
        throw new NotFoundException('Media không tồn tại');
      }
      banner.user_id_updated = currentUser.id;
      Object.assign(banner, updateBannerDto);
      await this.bannerRepository.save(banner);
      

      return createResponse(
        HttpStatus.OK,
        'OK',
        mapBannerResponse(banner, media.data),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteBanner(
    deleteBannerDto: DeleteBannerDto,
    currentUser: UserResponse,
  ): Promise<ApiResponse<BannerResponse>> {
    try {
      const banner = await this.bannerRepository.findOne({
        where: { id: deleteBannerDto.id },
      });
      if (!banner) throw new NotFoundException('Danh mục không tồn tại');
      banner.user_id_updated = currentUser.id;
      await this.bannerRepository.save(banner);
      return createResponse(HttpStatus.OK, 'OK', null);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async changeStatus(
    id: number,
    status: number,
  ): Promise<ApiResponse<BannerResponse>> {
    const banner = await this.bannerRepository.findOne({
      where: { id: id },
    });
    if (!banner) throw new NotFoundException('Danh mục không tồn tại');

    banner.status = status;

    await this.bannerRepository.save(banner); // Lưu vào database

    // let user_created: ApiResponse<UserResponse> = await lastValueFrom(
    //   this.userServiceGrpc.getUser({ id: banner.user_id_created }),
    // );
    // let user_updated: ApiResponse<UserResponse> = await lastValueFrom(
    //   this.userServiceGrpc.getUser({ id: banner.user_id_updated }),
    // );
    const media = await lastValueFrom(
      this.mediaServiceGrpc.getMedia({
        media_id: banner.media_id,
      }),
    );
    return createResponse(
      HttpStatus.OK,
      'OK',
      mapBannerResponse(
        banner,
        media.data,
      ),
    );
  }
}
