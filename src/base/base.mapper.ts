import { Injectable } from "@nestjs/common";
import { EntityBase } from "./base.entity";
import { BaseCreateDto } from "./dtos/create-base.dto";
import { BaseUpdateDto } from "./dtos/update-base.dto";
import { Mapper } from "@automapper/core";
import { ResponseBaseDto } from "./dtos/response-base.dto";

/**
 * 
 * @template TEntity The type of the entity being mapped.
 * @template TDto The type of the DTO used to create the entity.
 * @template TUpdateDto The type of the DTO used to update the entity.
 * @template TResponse The type of the DTO used for the response of the entity.
 */
@Injectable()
export class BaseMapper<TEntity extends EntityBase, TDto extends BaseCreateDto, TUpdateDto extends BaseUpdateDto, TResponse extends ResponseBaseDto> {
  private readonly _mapper: Mapper;
  constructor(mapper: Mapper) {
    this._mapper = mapper;
  }
  
  /**
 * Maps an entity to a response DTO.
 * @param entity The entity to be mapped.
 * @returns The resulting response DTO.
 */
mapEntityToResponse(entity: TEntity): TResponse {
  return this._mapper.map<TEntity, TResponse>(entity, null, null);
}

/**
 * Maps an array of entities to an array of response DTOs.
 * @param entity The array of entities to be mapped.
 * @returns An array of response DTOs.
 */
mapArrayToResponse(entity: TEntity[]): TResponse[] {
  return this._mapper.mapArray<TEntity, TResponse>(entity, null, null);
}

/**
 * Maps an update DTO to an entity.
 * @param entity The update DTO that needs to be mapped.
 * @returns The resulting entity.
 */
mapUpdateDtoToEntity(entity: TUpdateDto): TEntity {
  return this._mapper.map<TUpdateDto, TEntity>(entity, null, null);
}

/**
 * Maps a create DTO to an entity.
 * @param dto The create DTO that needs to be mapped.
 * @returns The resulting entity.
 */
mapCreateDtoToEntity(dto: TDto): TEntity {
  return this._mapper.map<TDto, TEntity>(dto, null, null);
}

/**
 * Maps an array of create DTOs to an array of entities.
 * @param dto The array of create DTOs to be mapped.
 * @returns An array of entities.
 */
mapCreateArrayToEntity(dto: TDto[]): TEntity[] {
  return this._mapper.mapArray<TDto, TEntity>(dto, null, null);
}

/**
 * Maps an array of update DTOs to an array of entities.
 * @param dto The array of update DTOs to be mapped.
 * @returns An array of entities.
 */
mapCreateUpdateArrayToEntity(dto: TUpdateDto[]): TEntity[] {
  return this._mapper.mapArray<TUpdateDto, TEntity>(dto, null, null);
}
}
