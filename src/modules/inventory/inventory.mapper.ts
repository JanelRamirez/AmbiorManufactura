import { InventoryCreateDto } from './dtos/create-inventory.dto';
import { InventoryUpdateDto } from './dtos/update-inventory.dto';
import { InventoryEntity } from './entity/inventory.toEntity';
import { InventoryResponseDto } from './dtos/response-inventory.dto';
import { BaseMapper } from 'src/base/base.mapper';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';

@Injectable()
export class InventoryMapper extends BaseMapper<
  InventoryEntity,
  InventoryCreateDto,
  InventoryUpdateDto,
  InventoryResponseDto
> {
  constructor(@InjectMapper() private mapper: Mapper) {
    super(mapper);
  }

  override mapEntityToResponse(entity: InventoryEntity): InventoryResponseDto {
    return this.mapper.map<InventoryEntity, InventoryResponseDto>(
      entity,
      InventoryEntity,
      InventoryResponseDto,
    );
  }

  override mapArrayToResponse(entity: InventoryEntity[]): InventoryResponseDto[] {
    return this.mapper.mapArray<InventoryEntity, InventoryResponseDto>(
      entity,
      InventoryEntity,
      InventoryResponseDto,
    );
  }

  override mapUpdateDtoToEntity(entity: InventoryUpdateDto): InventoryEntity {
    return this.mapper.map<InventoryUpdateDto, InventoryEntity>(
      entity,
      InventoryUpdateDto,
      InventoryEntity,
    );
  }

  override mapCreateDtoToEntity(dto: InventoryCreateDto): InventoryEntity {
    return this.mapper.map<InventoryCreateDto, InventoryEntity>(
      dto,
      InventoryCreateDto,
      InventoryEntity,
    );
  }

  override mapCreateArrayToEntity(dto: InventoryCreateDto[]): InventoryEntity[] {
    return this.mapper.mapArray<InventoryCreateDto, InventoryEntity>(
      dto,
      InventoryCreateDto,
      InventoryEntity,
    );
  }

  override mapCreateUpdateArrayToEntity(dto: InventoryUpdateDto[]): InventoryEntity[] {
    return this.mapper.mapArray<InventoryUpdateDto, InventoryEntity>(
      dto,
      InventoryUpdateDto,
      InventoryEntity,
    );
  }
}
