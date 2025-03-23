import { ProductCreateDto } from './dtos/create-product.dto';
import { ProductUpdateDto } from './dtos/update-product.dto';
import { ProductEntity } from './entity/product.toEntity';
import { ProductResponseDto } from './dtos/response-product.dto';
import { BaseMapper } from 'src/base/base.mapper';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';

@Injectable()
export class ProductMapper extends BaseMapper<
  ProductEntity,
  ProductCreateDto,
  ProductUpdateDto,
  ProductResponseDto
> {
  constructor(@InjectMapper() private mapper: Mapper) {
    super(mapper);
  }

  override mapEntityToResponse(entity: ProductEntity): ProductResponseDto {
    return this.mapper.map<ProductEntity, ProductResponseDto>(
      entity,
      ProductEntity,
      ProductResponseDto,
    );
  }

  override mapArrayToResponse(entity: ProductEntity[]): ProductResponseDto[] {
    return this.mapper.mapArray<ProductEntity, ProductResponseDto>(
      entity,
      ProductEntity,
      ProductResponseDto,
    );
  }

  override mapUpdateDtoToEntity(entity: ProductUpdateDto): ProductEntity {
    return this.mapper.map<ProductUpdateDto, ProductEntity>(
      entity,
      ProductUpdateDto,
      ProductEntity,
    );
  }

  override mapCreateDtoToEntity(dto: ProductCreateDto): ProductEntity {
    return this.mapper.map<ProductCreateDto, ProductEntity>(
      dto,
      ProductCreateDto,
      ProductEntity,
    );
  }

  override mapCreateArrayToEntity(dto: ProductCreateDto[]): ProductEntity[] {
    return this.mapper.mapArray<ProductCreateDto, ProductEntity>(
      dto,
      ProductCreateDto,
      ProductEntity,
    );
  }

  override mapCreateUpdateArrayToEntity(dto: ProductUpdateDto[]): ProductEntity[] {
    return this.mapper.mapArray<ProductUpdateDto, ProductEntity>(
      dto,
      ProductUpdateDto,
      ProductEntity,
    );
  }
}
