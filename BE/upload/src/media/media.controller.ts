import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { CurrentUser } from 'src/utils/decorators/current-user.decorator';
import { UserResponse } from 'src/utils/response/user.response';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/utils/exceptions/http.exception';
import { AuthenticationGuard } from 'src/utils/guards/authentication.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateMediaDto } from './dto/create-media.dto';
import { ApiResponse } from 'src/utils/interface/response.interface';
import { MediaProductResponse } from 'src/utils/response/media.response';
import moment from 'moment';
import { PublicAPI } from 'src/utils/decorators/authorize-roles.decorator';
import { GrpcMethod } from '@nestjs/microservices';
 

@Controller('media')
@ApiTags('media')
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthenticationGuard)
@ApiBearerAuth('access-token')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('file', 10, {
      storage: diskStorage({
        destination: './storage-media',
        filename: (req, file, cb) => {
          const formattedDate = moment().format('YYYYMMDDHHmmss');
          const fileExtName = extname(file.originalname);
          const originalName = file.originalname.split('.')[0];
          cb(null, `${formattedDate}_${originalName}${fileExtName}`);
        },
      }),
    }),
  )
  async uploadMediaProduct(
    @UploadedFiles() file: Express.Multer.File[],
    @Body() createMediaDto: CreateMediaDto,
    @CurrentUser() currentUser: UserResponse,
  ): Promise<ApiResponse<MediaProductResponse[]>> {
    try {
      return await this.mediaService.uploadMediaProduct(
        file,
        createMediaDto,
        currentUser,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @PublicAPI()
  @GrpcMethod('MediaServiceGrpc', 'getMedia')
  async getUser(getUserRequest: {
    media_id: number;
  }): Promise<ApiResponse<MediaProductResponse>> {
    try {
      return await this.mediaService.getMedia(+getUserRequest.media_id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @PublicAPI()
  @GrpcMethod('MediaServiceGrpc', 'getMediasByIds')
  async getMediasByIds(getMediasByIdsRequest: {
    media_ids: number[];
  }): Promise<ApiResponse<MediaProductResponse[]>> {
    try {
      return await this.mediaService.getMediasByIds(
        getMediasByIdsRequest.media_ids,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
