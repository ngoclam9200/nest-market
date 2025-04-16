import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, UseFilters, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HttpExceptionFilter } from 'src/utils/exceptions/http.exception';
import { AuthenticationGuard } from 'src/utils/guards/authentication.guard';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiResponse, PaginatedResponse } from 'src/utils/interface/response.interface';
import { ProductResponse } from 'src/utils/response/product.response';
import { ProductEntity } from './entities/product.entity';
import { AuthorizeGuard } from 'src/utils/guards/authorization.guard';
import { CurrentUser } from 'src/utils/decorators/current-user.decorator';
import { UserResponse } from 'src/utils/response/user.response';
import { DeleteProductDto } from './dto/delete-product.dto';
import { ProductService } from './products.service';
import { FindAllProductDTO } from './dto/find-all-product.dto';

@Controller('product')
@ApiTags('product')
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthenticationGuard)
@ApiBearerAuth('access-token')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @Get('all')
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 },)
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'status', required: false, type: Number, example: -1 })
  async findAllProduct(@Query() findAllProductDTO:FindAllProductDTO, @CurrentUser() currentUser: UserResponse): Promise<ApiResponse<PaginatedResponse<ProductResponse>>> {
    const {page , limit,status}= findAllProductDTO
    try {
      return await this.productsService.findAllProduct(page, limit, status, currentUser);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, type: Number },)
  async findOneUser( @Param('id') id: number,  @CurrentUser() currentUser: UserResponse): Promise<ApiResponse<ProductEntity>> {
    try {
      return await this.productsService.findOneProduct(+id, currentUser);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('create')
  @UseGuards(AuthorizeGuard(['admin']))
  async createProduct(@Body() createProductDto : CreateProductDto , @CurrentUser() currentUser: UserResponse){
    try {
      return await this.productsService.createProduct(createProductDto, currentUser)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('update')
  @UseGuards(AuthorizeGuard(['admin']))
  async updateProduct(@Body() updateProductDto : UpdateProductDto , @CurrentUser() currentUser: UserResponse){
    try {
      return await this.productsService.updateProduct(updateProductDto, currentUser)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('delete-product')
  @UseGuards(AuthorizeGuard(['admin']))
  async deleteProduct(@Body() deleteProductDto : DeleteProductDto , @CurrentUser() currentUser : UserResponse){
    try {
      return await this.productsService.deleteProduct(deleteProductDto, currentUser)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  } 

 
}
