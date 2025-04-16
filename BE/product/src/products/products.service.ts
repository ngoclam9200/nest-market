import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiResponse,
  PaginatedResponse,
} from 'src/utils/interface/response.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  createPaginatedResponse,
  createResponse,
} from 'src/utils/response/response.util';
import { UserResponse } from 'src/utils/response/user.response';
import { UserServiceGrpcClient } from 'src/utils/interface/user-service.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ProductEntity } from './entities/product.entity';
import {
  mapProductResponseWithAdmin,
  mapProductResponseWithUser,
  ProductResponse,
} from 'src/utils/response/product.response';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';
import { Roles } from 'src/utils/common/user-roles.enum';
import { GetTypeEnum } from 'src/utils/common/value.enum';
import { MediaResponse } from 'src/utils/response/media.response';
import { MediaServiceGrpcClient } from 'src/utils/interface/media-service.interface';
import { ProductPriceEntity } from './entities/product-price.entity';

@Injectable()
export class ProductService {
  private userServiceGrpc: UserServiceGrpcClient;
  private mediaServiceGrpc: MediaServiceGrpcClient;
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductPriceEntity)
    private productPriceRepository: Repository<ProductPriceEntity>,
    @Inject('USER_PACKAGE') private readonly userClient: ClientGrpc,
    @Inject('MEDIA_PACKAGE') private readonly mediaClient: ClientGrpc,
  ) {}
  onModuleInit() {
    this.userServiceGrpc =
      this.userClient.getService<UserServiceGrpcClient>('UserServiceGrpc');
    this.mediaServiceGrpc =
      this.mediaClient.getService<MediaServiceGrpcClient>('MediaServiceGrpc');
  }
  async findAllProduct(
    page: number = 1,
    limit: number = 10,
    status: number,
    currentUser: UserResponse,
  ): Promise<ApiResponse<PaginatedResponse<ProductResponse>>> {
    try {
      let get_all = {};
      if (status == GetTypeEnum.ALL) {
        get_all = { status: In([0, 1]) };
      } else {
        get_all = { status: status };
      }
      const [list, total_record] = await this.productRepository.findAndCount({
        where: get_all,
        skip: (page - 1) * limit,
        take: limit,
      });

      const mappedProductWithUserCreated = await Promise.all(
        list.map(async (product) => {
          let list_media: ApiResponse<MediaResponse[]> = await lastValueFrom(
            this.mediaServiceGrpc.getMediasByIds({
              media_ids: product.list_media_id,
            }),
          );
          if (list_media.status != HttpStatus.OK) {
            throw new BadRequestException(list_media.message);
          }
          if (currentUser.roles.includes(Roles.ADMIN)) {
            let user_created_and_updated: ApiResponse<UserResponse[]> =
              await lastValueFrom(
                this.userServiceGrpc.getUsersByIds({
                  user_ids: [product.user_id_created, product.user_id_updated],
                }),
              );
            const user_created = user_created_and_updated.data.find(
              (item) => item.id == product.user_id_created,
            );
            const user_updated = user_created_and_updated.data.find(
              (item) => item.id == product.user_id_updated,
            );
            return mapProductResponseWithAdmin(
              product,
              user_created,
              user_updated,
              list_media.data,
            );
          } else {
            return mapProductResponseWithUser(product, list_media.data);
          }
        }),
      );
      return createPaginatedResponse(
        HttpStatus.OK,
        'OK',

        mappedProductWithUserCreated,
        total_record,
        page,
        limit,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneProduct(
    id: number,
    currentUser: UserResponse,
  ): Promise<ApiResponse<ProductEntity>> {
    try {
      const product = await this.productRepository.findOne({
        where: { id: id },
      });
      if (!product) throw new NotFoundException('sản phẩm không tồn tại');
      let list_media: ApiResponse<MediaResponse[]> = await lastValueFrom(
        this.mediaServiceGrpc.getMediasByIds({
          media_ids: product.list_media_id,
        }),
      );
      if (list_media.status != HttpStatus.OK) {
        throw new BadRequestException(list_media.message);
      }
      if (currentUser.roles.includes(Roles.ADMIN)) {
        let user_created_and_updated: ApiResponse<UserResponse[]> =
          await lastValueFrom(
            this.userServiceGrpc.getUsersByIds({
              user_ids: [product.user_id_created, product.user_id_updated],
            }),
          );
        const user_created = user_created_and_updated.data.find(
          (item) => item.id == product.user_id_created,
        );
        const user_updated = user_created_and_updated.data.find(
          (item) => item.id == product.user_id_updated,
        );

        return createResponse(
          HttpStatus.OK,
          'OK',
          mapProductResponseWithAdmin(
            product,
            user_created,
            user_updated,
            list_media.data,
          ),
        );
      } else {
        return createResponse(
          HttpStatus.OK,
          'OK',
          mapProductResponseWithUser(product, list_media.data),
        );
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async createProduct(
    createProductDto: CreateProductDto,
    currentUser: UserResponse,
  ): Promise<ApiResponse<ProductResponse>> {
    try {
      if (
        !createProductDto.list_media_id.includes(
          createProductDto.default_media_id,
        )
      )
        return createResponse(
          HttpStatus.BAD_REQUEST,
          'Danh sách ảnh không chứa ảnh mặc định',
          null,
        );
      let list_media: ApiResponse<MediaResponse[]> = await lastValueFrom(
        this.mediaServiceGrpc.getMediasByIds({
          media_ids: createProductDto.list_media_id,
        }),
      );
      if (list_media.status != HttpStatus.OK) {
        throw new BadRequestException(list_media.message);
      }
      let product = this.productRepository.create(createProductDto);

      product.user_id_created = currentUser.id;
      product.user_id_updated = currentUser.id;
      product = await this.productRepository.save(product);
      let product_price =
        await this.productPriceRepository.create(createProductDto);
      product_price.user_id_created = currentUser.id;
      product_price.user_id_updated = currentUser.id;
      product_price.end_date = null;
      product_price.product_id = product.id;
      product_price = await this.productPriceRepository.save(product_price);
      return createResponse(
        HttpStatus.OK,
        'OK',
        mapProductResponseWithAdmin(
          product,
          currentUser,
          currentUser,
          list_media.data,
        ),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateProduct(
    updateProductDto: UpdateProductDto,
    currentUser: UserResponse,
  ): Promise<ApiResponse<ProductResponse>> {
    try {
      const product = await this.productRepository.findOne({
        where: { id: updateProductDto.id },
      });
      if (!product) throw new NotFoundException('Danh mục không tồn tại');
      product.user_id_updated = currentUser.id;
      Object.assign(product, updateProductDto);
      this.productRepository.save(product);
      let user_created: ApiResponse<UserResponse> = await lastValueFrom(
        this.userServiceGrpc.getUser({ id: product.user_id_created }),
      );
      let list_media: ApiResponse<MediaResponse[]> = await lastValueFrom(
        this.mediaServiceGrpc.getMediasByIds({
          media_ids: updateProductDto.list_media_id,
        }),
      );
      return createResponse(
        HttpStatus.OK,
        'OK',
        mapProductResponseWithAdmin(
          product,
          user_created.data,
          currentUser,
          list_media.data,
        ),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteProduct(
    deleteProductDto: DeleteProductDto,
    currentUser: UserResponse,
  ): Promise<ApiResponse<ProductResponse>> {
    try {
      const product = await this.productRepository.findOne({
        where: { id: deleteProductDto.id },
      });
      if (!product) throw new NotFoundException('Danh mục không tồn tại');
      product.user_id_updated = currentUser.id;
      this.productRepository.save(product);
      return createResponse(HttpStatus.OK, 'OK', null);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
