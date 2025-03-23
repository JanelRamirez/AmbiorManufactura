import { ProductionCreateDto } from './dtos/create-production.dto';
import { ProductionUpdateDto } from './dtos/update-production.dto';
import { ProductionEntity } from './entity/production.toEntity';
import { ProductionResponseDto } from './dtos/response-production.dto';
import { BaseMapper } from 'src/base/base.mapper';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';

@Injectable()
export class ProductionMapper extends BaseMapper<
  ProductionEntity,
  ProductionCreateDto,
  ProductionUpdateDto,
  ProductionResponseDto
> {
  constructor(@InjectMapper() private mapper: Mapper) {
    super(mapper);
  }

  override mapEntityToResponse(entity: ProductionEntity): ProductionResponseDto {
    return this.mapper.map<ProductionEntity, ProductionResponseDto>(
      entity,
      ProductionEntity,
      ProductionResponseDto,
    );
  }

  override mapArrayToResponse(entity: ProductionEntity[]): ProductionResponseDto[] {
    return this.mapper.mapArray<ProductionEntity, ProductionResponseDto>(
      entity,
      ProductionEntity,
      ProductionResponseDto,
    );
  }

  override mapUpdateDtoToEntity(entity: ProductionUpdateDto): ProductionEntity {
    return this.mapper.map<ProductionUpdateDto, ProductionEntity>(
      entity,
      ProductionUpdateDto,
      ProductionEntity,
    );
  }

  override mapCreateDtoToEntity(dto: ProductionCreateDto): ProductionEntity {
    return this.mapper.map<ProductionCreateDto, ProductionEntity>(
      dto,
      ProductionCreateDto,
      ProductionEntity,
    );
  }

  override mapCreateArrayToEntity(dto: ProductionCreateDto[]): ProductionEntity[] {
    return this.mapper.mapArray<ProductionCreateDto, ProductionEntity>(
      dto,
      ProductionCreateDto,
      ProductionEntity,
    );
  }

  override mapCreateUpdateArrayToEntity(dto: ProductionUpdateDto[]): ProductionEntity[] {
    return this.mapper.mapArray<ProductionUpdateDto, ProductionEntity>(
      dto,
      ProductionUpdateDto,
      ProductionEntity,
    );
  }
}
