import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiResponse,
  PaginatedResponse,
} from 'src/utils/interface/response.interface';
import {
  CategoryResponse,
  mapCateGoryResponseWithAdmin,
  mapCateGoryResponseWithUser,
} from 'src/utils/response/category.response';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { In, IsNull, Not, Repository } from 'typeorm';
import {
  createPaginatedResponse,
  createResponse,
} from 'src/utils/response/response.util';
import { UserResponse } from 'src/utils/response/user.response';
import { UserServiceGrpcClient } from 'src/utils/interface/user-service.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { MediaServiceGrpcClient } from 'src/utils/interface/media-service.interface';
import { GetTypeEnum } from 'src/utils/common/value.enum';
import { Roles } from 'src/utils/common/user-roles.enum';
import { CurrentUser } from 'src/utils/decorators/current-user.decorator';
import { formatSlug } from 'src/utils/common/format-slug';
import { mapResponseMediaDefault } from 'src/utils/response/media.response';

@Injectable()
export class CategoriesService {
  private userServiceGrpc: UserServiceGrpcClient;
  private mediaServiceGrpc: MediaServiceGrpcClient;
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @Inject('USER_PACKAGE') private readonly userClient: ClientGrpc,
    @Inject('MEDIA_PACKAGE') private readonly mediaClient: ClientGrpc,
  ) {}
  onModuleInit() {
    this.userServiceGrpc =
      this.userClient.getService<UserServiceGrpcClient>('UserServiceGrpc');
    this.mediaServiceGrpc =
      this.mediaClient.getService<MediaServiceGrpcClient>('MediaServiceGrpc');
  }
  async findAllCategoryParent(
    status: number = GetTypeEnum.NOT_DELETED,
    currentUser: UserResponse,
  ): Promise<ApiResponse<PaginatedResponse<CategoryResponse>>> {
    try {
      const get_all: any = {
        parent_id: IsNull(),
      };
      if (status == GetTypeEnum.ALL) {
        get_all.status = In([0, 1]);
      } else {
        get_all.status = status;
      }

      const list = await this.categoryRepository.find({
        where: get_all,
        order: { id: 'DESC' },
      });

      const listCategoryMediaIds = list.map((item) => item.media_id);

      const listUserCreatedIds = list.map((item) => item.user_id_created);
      const listUserUpdatedIds = list.map((item) => item.user_id_created);
      const list_media = await lastValueFrom(
        this.mediaServiceGrpc.getMediasByIds({
          media_ids: listCategoryMediaIds,
        }),
      );
      const list_user_created = await lastValueFrom(
        this.userServiceGrpc.getUsersByIds({ user_ids: listUserCreatedIds }),
      );

      const list_user_updated = await lastValueFrom(
        this.userServiceGrpc.getUsersByIds({ user_ids: listUserUpdatedIds }),
      );

      const mappedCateWithUserCreated = await Promise.all(
        list.map(async (cate) => {
          let media = list_media.data.find((item) => item.id == cate.media_id);
          if (!media) media = mapResponseMediaDefault(cate.media_id);

          const user_created = list_user_created.data.find(
            (item) => item.id == cate.user_id_created,
          );
          const user_updated = list_user_updated.data.find(
            (item) => item.id == cate.user_id_updated,
          );

          const exsistParentCategory = cate.parent_id
            ? await this.categoryRepository.findOne({
                where: { id: cate.parent_id },
              })
            : null;
          if (currentUser && currentUser.roles.includes(Roles.ADMIN)) {
            return mapCateGoryResponseWithAdmin(
              exsistParentCategory,
              cate,
              user_created,
              user_updated,
              media,
            );
          }
          return mapCateGoryResponseWithUser(cate, media);
        }),
      );

      return createResponse(HttpStatus.OK, 'OK', mappedCateWithUserCreated);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllCategoryChild(
    status: number = GetTypeEnum.NOT_DELETED,
    parent_id: number,
    currentUser: UserResponse,
  ): Promise<ApiResponse<PaginatedResponse<CategoryResponse>>> {
    try {

      const get_all: any = {};
      if (parent_id == GetTypeEnum.ALL) {
        get_all.parent_id = Not(IsNull());
      } else {
        get_all.parent_id = parent_id;
      }
      if (status == GetTypeEnum.ALL) {
        get_all.status = In([0, 1]);
      } else {
        get_all.status = status;
      }

      const list = await this.categoryRepository.find({
        where: get_all,
        order: { id: 'DESC' },
      });

      const listCategoryMediaIds = list.map((item) => item.media_id);

      const listUserCreatedIds = list.map((item) => item.user_id_created);
      const listUserUpdatedIds = list.map((item) => item.user_id_created);
      const list_media = await lastValueFrom(
        this.mediaServiceGrpc.getMediasByIds({
          media_ids: listCategoryMediaIds,
        }),
      );
      const list_user_created = await lastValueFrom(
        this.userServiceGrpc.getUsersByIds({ user_ids: listUserCreatedIds }),
      );

      const list_user_updated = await lastValueFrom(
        this.userServiceGrpc.getUsersByIds({ user_ids: listUserUpdatedIds }),
      );

      const mappedCateWithUserCreated = await Promise.all(
        list.map(async (cate) => {
          let media = list_media.data.find((item) => item.id == cate.media_id);
          if (!media) media = mapResponseMediaDefault(cate.media_id);

          const user_created = list_user_created.data.find(
            (item) => item.id == cate.user_id_created,
          );
          const user_updated = list_user_updated.data.find(
            (item) => item.id == cate.user_id_updated,
          );

          const exsistParentCategory = cate.parent_id
            ? await this.categoryRepository.findOne({
                where: { id: cate.parent_id },
              })
            : null;
          if ( currentUser && currentUser.roles.includes(Roles.ADMIN)) {
            return mapCateGoryResponseWithAdmin(
              exsistParentCategory,
              cate,
              user_created,
              user_updated,
              media,
            );
          }
          return mapCateGoryResponseWithUser(cate, media);
        }),
      );

      return createResponse(HttpStatus.OK, 'OK', mappedCateWithUserCreated);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async findOneCategory(
    id: number,
    currentUser: UserResponse,
  ): Promise<ApiResponse<CategoryEntity>> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: id },
      });
      if (!category) throw new NotFoundException('Danh mục không tồn tại');
      const media = await lastValueFrom(
        this.mediaServiceGrpc.getMedia({ media_id: category.media_id }),
      );
      if (currentUser && currentUser.roles.includes(Roles.ADMIN)) {
        let user_created_and_updated: ApiResponse<UserResponse[]> =
          await lastValueFrom(
            this.userServiceGrpc.getUsersByIds({
              user_ids: [category.user_id_created, category.user_id_updated],
            }),
          );
        const user_created = user_created_and_updated.data.find(
          (item) => item.id == category.user_id_created,
        );
        const user_updated = user_created_and_updated.data.find(
          (item) => item.id == category.user_id_updated,
        );
        const exsistParentCategory = category.parent_id
          ? await this.categoryRepository.findOne({
              where: { id: category.parent_id },
            })
          : null;
        return createResponse(
          HttpStatus.OK,
          'OK',
          mapCateGoryResponseWithAdmin(
            exsistParentCategory,
            category,
            user_created,
            user_updated,
            media.data,
          ),
        );
      }
      return createResponse(
        HttpStatus.OK,
        'OK',
        mapCateGoryResponseWithUser(category, media.data),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async findAllCategoryChildWithParentId(
    page: number = 1,
    limit: number = 10,
    status: number = GetTypeEnum.ALL,
    parent_id: number,
    currentUser: UserResponse,
  ): Promise<ApiResponse<PaginatedResponse<CategoryResponse>>> {
    try {
      let get_all: any = {
        parent_id: parent_id,
      };
      if (status == GetTypeEnum.ALL) {
        get_all.status = In([0, 1]);
      } else {
        get_all.status = status;
      }

      const [list, total_record] = await this.categoryRepository.findAndCount({
        where: get_all,
        skip: (page - 1) * limit,
        take: limit,
        order: { id: 'DESC' },
      });
      const listCategoryMediaIds = list.map((item) => item.media_id);
      const listUserCreatedIds = list.map((item) => item.user_id_created);
      const listUserUpdatedIds = list.map((item) => item.user_id_created);
      const list_media = await lastValueFrom(
        this.mediaServiceGrpc.getMediasByIds({
          media_ids: listCategoryMediaIds,
        }),
      );
      const list_user_created = await lastValueFrom(
        this.userServiceGrpc.getUsersByIds({
          user_ids: listUserCreatedIds,
        }),
      );
      const list_user_updated = await lastValueFrom(
        this.userServiceGrpc.getUsersByIds({
          user_ids: listUserUpdatedIds,
        }),
      );
      const mappedCateWithUserCreated = await Promise.all(
        list.map(async (cate) => {
          let media = list_media.data.find((item) => item.id == cate.media_id);
          if (!media) media = mapResponseMediaDefault(cate.media_id);

          const user_created = list_user_created.data.find(
            (item) => item.id == cate.user_id_created,
          );
          const user_updated = list_user_updated.data.find(
            (item) => item.id == cate.user_id_updated,
          );
          const exsistParentCategory = cate.parent_id
            ? await this.categoryRepository.findOne({
                where: { id: cate.parent_id },
              })
            : null;

          if (currentUser && currentUser.roles.includes(Roles.ADMIN)) {
            return mapCateGoryResponseWithAdmin(
              exsistParentCategory,
              cate,
              user_created,
              user_updated,
              media,
            );
          }
          return mapCateGoryResponseWithUser(cate, media);
        }),
      );
      return createPaginatedResponse(
        HttpStatus.OK,
        'OK',
        mappedCateWithUserCreated,
        total_record,
        page,
        limit,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findCategoryWithCode(
    code: string,
    currentUser: UserResponse,
  ): Promise<ApiResponse<CategoryEntity>> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { code: code },
      });
      if (!category) throw new NotFoundException('Danh mục không tồn tại');
      const media = await lastValueFrom(
        this.mediaServiceGrpc.getMedia({ media_id: category.media_id }),
      );

      if (currentUser && currentUser.roles.includes(Roles.ADMIN)) {
        let user_created_and_updated: ApiResponse<UserResponse[]> =
          await lastValueFrom(
            this.userServiceGrpc.getUsersByIds({
              user_ids: [category.user_id_created, category.user_id_updated],
            }),
          );
        const user_created = user_created_and_updated.data.find(
          (item) => item.id == category.user_id_created,
        );
        const user_updated = user_created_and_updated.data.find(
          (item) => item.id == category.user_id_updated,
        );
        const exsistParentCategory = await this.categoryRepository.findOne({
          where: { id: category.parent_id },
        });
        return createResponse(
          HttpStatus.OK,
          'OK',
          mapCateGoryResponseWithAdmin(
            exsistParentCategory,
            category,
            user_created,
            user_updated,
            media.data,
          ),
        );
      }
      return createResponse(
        HttpStatus.OK,
        'OK',
        mapCateGoryResponseWithUser(category, media.data),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    currentUser: UserResponse,
  ): Promise<ApiResponse<CategoryResponse>> {
    try {
      const media = await lastValueFrom(
        this.mediaServiceGrpc.getMedia({
          media_id: createCategoryDto.media_id,
        }),
      );
      if (media.status == HttpStatus.BAD_REQUEST) {
        throw new NotFoundException('Media không tồn tại');
      }

      const exsistParentCategory =
        createCategoryDto.parent_id != -1 && createCategoryDto.parent_id
          ? await this.categoryRepository.findOne({
              where: { id: createCategoryDto.parent_id },
            })
          : null;

      let category = this.categoryRepository.create(createCategoryDto);
      category.user_id_created = currentUser.id;
      category.user_id_updated = currentUser.id;
      category.code = formatSlug(createCategoryDto.name);
      const data = await this.categoryRepository.save(category);
      return createResponse(
        HttpStatus.OK,
        'OK',
        mapCateGoryResponseWithAdmin(
          exsistParentCategory,
          data,
          currentUser,
          currentUser,
          media.data,
        ),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateCategory(
    updateCategoryDto: UpdateCategoryDto,
    currentUser: UserResponse,
  ): Promise<ApiResponse<CategoryResponse>> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: updateCategoryDto.id },
      });
      if (!category) throw new NotFoundException('Danh mục không tồn tại');
      const media = await lastValueFrom(
        this.mediaServiceGrpc.getMedia({
          media_id: updateCategoryDto.media_id,
        }),
      );
      if (media.status == HttpStatus.BAD_REQUEST) {
        throw new NotFoundException('Media không tồn tại');
      }
      category.user_id_updated = currentUser.id;
      Object.assign(category, updateCategoryDto);
      await this.categoryRepository.save(category);
      let user_created: ApiResponse<UserResponse> = await lastValueFrom(
        this.userServiceGrpc.getUser({ id: category.user_id_created }),
      );
      const exsistParentCategory = await this.categoryRepository.findOne({
        where: { id: category.parent_id },
      });
      return createResponse(
        HttpStatus.OK,
        'OK',
        mapCateGoryResponseWithAdmin(
          exsistParentCategory,
          category,
          user_created.data,
          currentUser,
          media.data,
        ),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteCategory(
    deleteCategoryDto: DeleteCategoryDto,
    currentUser: UserResponse,
  ): Promise<ApiResponse<CategoryResponse>> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: deleteCategoryDto.id },
      });
      if (!category) throw new NotFoundException('Danh mục không tồn tại');
      category.user_id_updated = currentUser.id;
      await this.categoryRepository.save(category);
      return createResponse(HttpStatus.OK, 'OK', null);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async changeStatus(
    id: number,
    status: number,
  ): Promise<ApiResponse<CategoryResponse>> {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
    });
    if (!category) throw new NotFoundException('Danh mục không tồn tại');

    category.status = status;

    await this.categoryRepository.save(category); // Lưu vào database
    const exsistParentCategory = await this.categoryRepository.findOne({
      where: { id: category.parent_id },
    });
    let user_created: ApiResponse<UserResponse> = await lastValueFrom(
      this.userServiceGrpc.getUser({ id: category.user_id_created }),
    );
    let user_updated: ApiResponse<UserResponse> = await lastValueFrom(
      this.userServiceGrpc.getUser({ id: category.user_id_updated }),
    );
    const media = await lastValueFrom(
      this.mediaServiceGrpc.getMedia({
        media_id: category.media_id,
      }),
    );
    return createResponse(
      HttpStatus.OK,
      'OK',
      mapCateGoryResponseWithAdmin(
        exsistParentCategory,
        category,
        user_created.data,
        user_updated.data,
        media.data,
      ),
    );
  }
}
