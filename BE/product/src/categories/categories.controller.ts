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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
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
import { CategoryEntity } from './entities/category.entity';
import { CategoryResponse } from 'src/utils/response/category.response';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import {
  FindAllCategoryChildDTO,
  FindAllCategoryParentDTO,
} from './dto/find-all-category.dto';

@Controller('categories')
@ApiTags('categories')
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthenticationGuard)
@ApiBearerAuth('access-token')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('child')
  // @UseGuards(AuthorizeGuard(['admin']))
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'status', required: false, type: Number, example: -1 })
  async findAllCategory(
    @Query() findAllCategoryDTO: FindAllCategoryChildDTO,
    @CurrentUser() currentUser: UserResponse,
  ): Promise<ApiResponse<PaginatedResponse<CategoryResponse>>> {
    const { page, limit, status, parent_id } = findAllCategoryDTO;
    try {
      return await this.categoriesService.findAllCategoryChildWithParentId(
        page,
        limit,
        status,
        parent_id,
        currentUser,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('parent')
  @ApiQuery({ name: 'status', required: false, type: Number, example: -1 })
  async findAllCategoryParent(
    @Query() findAllCategoryDTO: FindAllCategoryParentDTO,
    @CurrentUser() currentUser: UserResponse,
  ): Promise<ApiResponse<PaginatedResponse<CategoryResponse>>> {
    const { status } = findAllCategoryDTO;
    try {
      return await this.categoriesService.findAllCategoryParent(
        status,
        currentUser,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('all-child')
  @ApiQuery({ name: 'status', required: false, type: Number, example: -1 })
  async findAllCategoryChild(
    @Query() findAllCategoryDTO: FindAllCategoryParentDTO,
    @CurrentUser() currentUser: UserResponse,
  ): Promise<ApiResponse<PaginatedResponse<CategoryResponse>>> {
    const { status, parent_id } = findAllCategoryDTO;
    try {
      return await this.categoriesService.findAllCategoryChild(
        status,
        parent_id,
        currentUser,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, type: Number })
  async findOneCategory(
    @Param('id') id: number,
    @CurrentUser() currentUser: UserResponse,
  ): Promise<ApiResponse<CategoryEntity>> {
    try {
      return await this.categoriesService.findOneCategory(+id, currentUser);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('with-code/:code')
  async findCategoryWithCode(
    @Param('code') code: string,
    @CurrentUser() currentUser: UserResponse,
  ): Promise<ApiResponse<CategoryEntity>> {
    try {
      return await this.categoriesService.findCategoryWithCode(
        code,
        currentUser,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('create')
  @UseGuards(AuthorizeGuard(['admin']))
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUser() currentUser: UserResponse,
  ) {
    try {
      return await this.categoriesService.createCategory(
        createCategoryDto,
        currentUser,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('update')
  @UseGuards(AuthorizeGuard(['admin']))
  async updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @CurrentUser() currentUser: UserResponse,
  ) {
    try {
      return await this.categoriesService.updateCategory(
        updateCategoryDto,
        currentUser,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('delete-category')
  @UseGuards(AuthorizeGuard(['admin']))
  async deleteCategory(
    @Body() deleteCategoryDto: DeleteCategoryDto,
    @CurrentUser() currentUser: UserResponse,
  ) {
    try {
      return await this.categoriesService.deleteCategory(
        deleteCategoryDto,
        currentUser,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/change-status')
  @UseGuards(AuthorizeGuard(['admin']))
  async changeStatus(@Param('id') id: number, @Body('status') status: number) {
    return this.categoriesService.changeStatus(id, status);
  }
}
