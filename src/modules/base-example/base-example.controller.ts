import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { CategoryEntity } from './entity/base-example.toEntity';
import { CategoryCreateDto } from './dtos/create-base-example.dto';
import { CategoryUpdateDto } from './dtos/update-base-example.dto';
import { CategoryService } from './service/base-example.service';
import { MapperService } from 'src/core/shared/providers/mapper.service';

@Controller('api/category')
@ApiTags('categories')
export class CategoryController extends BaseController<
  CategoryEntity,
  CategoryCreateDto,
  CategoryUpdateDto
>(CategoryCreateDto, CategoryUpdateDto) {
  constructor(
    private readonly categoryService: CategoryService,
    mapperService: MapperService,
  ) {
    super(categoryService, mapperService);
  }
}
