import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { CategoryEntity } from './entity/base-example.toEntity';
import { CategoryCreateDto } from './dtos/create-base-example.dto';
import { CategoryUpdateDto } from './dtos/update-base-example.dto';
import { CategoryService } from './service/base-example.service';
import { BaseExampleMapper } from './base-example.mapper';

@Controller('api/category')
@ApiTags('categories')
export class CategoryController extends BaseController<
  CategoryEntity,
  CategoryCreateDto,
  CategoryUpdateDto
> 
{
  constructor(
    private readonly categoryService: CategoryService,
    private readonly mapper: BaseExampleMapper,
  ) {
    super(categoryService, mapper);
  }
}
