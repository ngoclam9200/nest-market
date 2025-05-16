import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserResponse } from 'src/utils/response/user.response';
import * as admin from 'firebase-admin';
import * as path from 'path';
import { ClientGrpc } from '@nestjs/microservices';
import { UserServiceGrpcClient } from 'src/utils/interface/user-service.interface';
import { CreateMediaDto } from './dto/create-media.dto';
import { ApiResponse } from 'src/utils/interface/response.interface';
import {
  mapMediaResponse,
  MediaProductResponse,
} from 'src/utils/response/media.response';
import { Repository } from 'typeorm';
import { MediaEntity } from './entities/media.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createResponse } from 'src/utils/response/response.util';

@Injectable()
export class MediaService {
  private userServiceGrpc: UserServiceGrpcClient;
  constructor(
    @InjectRepository(MediaEntity)
    private mediaRepository: Repository<MediaEntity>,
    @Inject('USER_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userServiceGrpc =
      this.client.getService<UserServiceGrpcClient>('UserServiceGrpc');
  }

  async uploadMediaProduct(
    files: Express.Multer.File[],
    createMediaDto: CreateMediaDto,
    currentUser: UserResponse,
  ): Promise<ApiResponse<MediaProductResponse[]>> {
    try {
      const responses: MediaProductResponse[] = [];
      for (const file of files) {
        let data = {
          type: createMediaDto.type,
          url: 'storage-media/' + file.filename,
          size: file.size,
          name: file.originalname,
        };
        let media = await this.mediaRepository.create(data);
        media = await this.mediaRepository.save(media);
        const mapMedia = mapMediaResponse(media);
        responses.push(mapMedia);
      }

      return createResponse(HttpStatus.OK, 'OK', responses);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getMedia(media_id: number): Promise<ApiResponse<MediaProductResponse>> {
    try {
      const media = await this.mediaRepository.findOne({
        where: { id: media_id },
      });
      if (!media) {
        return createResponse(
          HttpStatus.BAD_REQUEST,
          'Media không tồn tại',
          null,
        );
      }
      if (!media) {
        throw new Error(`Media_id=${media_id} không tồn tại`);
      }
      const mapMedia = mapMediaResponse(media);
      return createResponse(HttpStatus.OK, 'OK', mapMedia);
    } catch (error) {
      return createResponse(HttpStatus.BAD_REQUEST, error, null);
    }
  }

  async getMediasByIds(
    media_ids: number[],
  ): Promise<ApiResponse<MediaEntity[]>> {
    try {
      const find_media = await Promise.all(
        media_ids.map(async (media_id) => {
          const media = await this.mediaRepository.findOne({
            where: { id: media_id },
          });
          if (!media) {
            return {};
          }
          return mapMediaResponse(media);
        }),
      );
      return createResponse(HttpStatus.OK, 'OK', find_media);
    } catch (error) {
      return createResponse(HttpStatus.BAD_REQUEST, error, null);
    }
  }
}
