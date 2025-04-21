import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  UseGuards,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/utils/exceptions/http.exception';
import { AuthenticationGuard } from 'src/utils/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utils/guards/authorization.guard';
import { CurrentUser } from 'src/utils/decorators/current-user.decorator';
import { UserResponse } from 'src/utils/response/user.response';
import {
  ApiResponse,
  PaginatedResponse,
} from 'src/utils/interface/response.interface';
import { BannerEntity } from './entities/banner.entity';

import { DeleteBannerDto } from './dto/delete-banner.dto';
import { FindAllBannerDTO } from './dto/find-all-banner.dto';
import { BannerResponse } from 'src/utils/response/banner.response';

@Controller('banner')
@ApiTags('banner')
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthenticationGuard)
@ApiBearerAuth('access-token')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get('')
  @ApiQuery({ name: 'status', required: false, type: Number, example: -1 })
  async findAllBanner(
    @Query() findAllBannerDTO: FindAllBannerDTO,
  ): Promise<ApiResponse<PaginatedResponse<BannerResponse>>> {
    const { status } = findAllBannerDTO;
    try {
      return await this.bannerService.findAllBanner(status);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('create')
  @UseGuards(AuthorizeGuard(['admin']))
  async createBanner(
    @Body() createBannerDto: CreateBannerDto,
    @CurrentUser() currentUser: UserResponse,
  ) {
    try {
      return await this.bannerService.createBanner(
        createBannerDto,
        currentUser,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('update')
  @UseGuards(AuthorizeGuard(['admin']))
  async updateBanner(
    @Body() updateBannerDto: UpdateBannerDto,
    @CurrentUser() currentUser: UserResponse,
  ) {
    try {
      return await this.bannerService.updateBanner(
        updateBannerDto,
        currentUser,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('delete-banner')
  @UseGuards(AuthorizeGuard(['admin']))
  async deleteBanner(
    @Body() deleteBannerDto: DeleteBannerDto,
    @CurrentUser() currentUser: UserResponse,
  ) {
    try {
      return await this.bannerService.deleteBanner(
        deleteBannerDto,
        currentUser,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
 
  @Post('change-status')
  @UseGuards(AuthorizeGuard(['admin']))
  async changeStatus(@Body('id') id: number, @Body('status') status: number) {
    return this.bannerService.changeStatus(id, status);
  }
}
