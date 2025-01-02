import { Injectable } from '@nestjs/common';
import { CarCreateDto } from './dtos/create-car.dto';
import { CarUpdateDto } from './dtos/update-car.dto';
import { CarEntity } from './entity/car.toEntity';
import { BaseMapper } from 'src/base/base.mapper';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class CarMapper extends BaseMapper<
  CarEntity,
  CarCreateDto,
  CarUpdateDto
> {
  constructor(@InjectMapper() private mapper: Mapper) {
    super(mapper);
  }

  override mapToDto(entity: CarEntity): CarCreateDto {
    return this.mapper.map<CarEntity, CarCreateDto>(entity, CarEntity, CarCreateDto);
  }

  override mapToUpdateDto(entity: CarEntity): CarUpdateDto {
    return this.mapper.map<CarEntity, CarUpdateDto>(entity, null, null);
  }

  override mapToEntity(dto: CarCreateDto): CarEntity {
    return this.mapper.map<CarCreateDto, CarEntity>(dto, CarCreateDto, CarEntity);
  }

  override arrayMapToDto(entity: CarEntity[]): CarCreateDto[] {
    return this.mapper.mapArray<CarEntity, CarCreateDto>(
      entity,
      CarEntity,
      CarCreateDto,
    );
  }

  override arrayMapToEntity(dto: CarCreateDto[]): CarEntity[] {
    return this.mapper.mapArray<CarCreateDto, CarEntity>(dto, CarCreateDto, CarEntity);
  }
}
