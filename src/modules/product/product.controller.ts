import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { ProductEntity } from './entity/product.toEntity';
import { ProductCreateDto } from './dtos/create-product.dto';
import { ProductUpdateDto } from './dtos/update-product.dto';
import { ProductResponseDto } from './dtos/response-product.dto';
import { ProductService } from './service/product.service';
import { ProductMapper } from './product.mapper';
import { ProductValidator } from './product.validator';

@Controller('api/product')
@ApiTags('product')
export class ProductController extends BaseController<
  ProductEntity,
  ProductCreateDto,
  ProductUpdateDto,
  ProductResponseDto
> 
{
  constructor(
    private readonly _ProductService: ProductService,
    private readonly _ProductMapper: ProductMapper,
    private readonly _ProductValidator: ProductValidator,
  ) {
    super(_ProductService, _ProductMapper, _ProductValidator);
  }
}
