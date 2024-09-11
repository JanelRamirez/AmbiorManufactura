import { Injectable } from '@nestjs/common';
import { CategoryCreateDto } from './dtos/create-base-example.dto';
import { CategoryEntity } from './entity/base-example.toEntity';
import { BaseMapper } from 'src/base/base.mapper';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CategoryUpdateDto } from './dtos/update-base-example.dto';

@Injectable()
export class BaseExampleMapper extends BaseMapper<
  CategoryEntity,
  CategoryCreateDto,
  CategoryUpdateDto
> {
  constructor(@InjectMapper() private mapper: Mapper) {
    super(mapper);
  }

  override mapToDto(entity: CategoryEntity): CategoryCreateDto {
    return this.mapper.map<CategoryEntity, CategoryCreateDto>(entity, CategoryEntity, CategoryCreateDto);
  }

  override mapToUpdateDto(entity: CategoryEntity): CategoryUpdateDto {
    return this.mapper.map<CategoryEntity, CategoryUpdateDto>(entity, null, null);
  }

  override mapToEntity(dto: CategoryCreateDto): CategoryEntity {
    return this.mapper.map<CategoryCreateDto, CategoryEntity>(dto, CategoryCreateDto, CategoryEntity);
  }

  override arrayMapToDto(entity: CategoryEntity[]): CategoryCreateDto[] {
    return this.mapper.mapArray<CategoryEntity, CategoryCreateDto>(
      entity,
      CategoryEntity,
      CategoryCreateDto,
    );
  }

  override arrayMapToEntity(dto: CategoryCreateDto[]): CategoryEntity[] {
    return this.mapper.mapArray<CategoryCreateDto, CategoryEntity>(dto, CategoryCreateDto, CategoryEntity);
  }
}
