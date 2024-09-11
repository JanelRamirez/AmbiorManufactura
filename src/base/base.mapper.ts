import { Injectable } from "@nestjs/common";
import { EntityBase } from "./base.entity";
import { BaseCreateDto } from "./dtos/create-base.dto";
import { BaseUpdateDto } from "./dtos/update-base.dto";
import { Mapper } from "@automapper/core";


@Injectable()
export class BaseMapper<TEntity extends EntityBase, TDto extends BaseCreateDto, TUpdateDto extends BaseUpdateDto> {
  private readonly _mapper: Mapper;
  constructor(mapper: Mapper) {
    this._mapper = mapper;
  }

  mapToDto(entity: TEntity): TDto {
    return this._mapper.map<TEntity, TDto>(entity, null, null);
  }

  mapToUpdateDto(entity: TEntity): TUpdateDto {
    return this._mapper.map<TEntity, TUpdateDto>(entity, null, null);
  }

  mapToEntity(dto: TDto): TEntity {
    return this._mapper.map<TDto, TEntity>(dto, null, null);
  }

  arrayMapToDto(entity: TEntity[]): TDto[] {
    return this._mapper.mapArray<TEntity, TDto>(entity, null, null);
  }

  arrayMapToEntity(dto: TDto[]): TEntity[] {
    return this._mapper.mapArray<TDto, TEntity>(dto, null, null);
  }
}
