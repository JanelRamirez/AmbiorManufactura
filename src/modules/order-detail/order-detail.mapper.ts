import { OrderDetailCreateDto } from './dtos/create-order-detail.dto';
import { OrderDetailUpdateDto } from './dtos/update-order-detail.dto';
import { OrderDetailEntity } from './entity/order-detail.toEntity';
import { OrderDetailResponseDto } from './dtos/response-order-detail.dto';
import { BaseMapper } from 'src/base/base.mapper';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';

@Injectable()
export class OrderDetailMapper extends BaseMapper<
  OrderDetailEntity,
  OrderDetailCreateDto,
  OrderDetailUpdateDto,
  OrderDetailResponseDto
> {
  constructor(@InjectMapper() private mapper: Mapper) {
    super(mapper);
  }

  override mapEntityToResponse(entity: OrderDetailEntity): OrderDetailResponseDto {
    return this.mapper.map<OrderDetailEntity, OrderDetailResponseDto>(
      entity,
      OrderDetailEntity,
      OrderDetailResponseDto,
    );
  }

  override mapArrayToResponse(entity: OrderDetailEntity[]): OrderDetailResponseDto[] {
    return this.mapper.mapArray<OrderDetailEntity, OrderDetailResponseDto>(
      entity,
      OrderDetailEntity,
      OrderDetailResponseDto,
    );
  }

  override mapUpdateDtoToEntity(entity: OrderDetailUpdateDto): OrderDetailEntity {
    return this.mapper.map<OrderDetailUpdateDto, OrderDetailEntity>(
      entity,
      OrderDetailUpdateDto,
      OrderDetailEntity,
    );
  }

  override mapCreateDtoToEntity(dto: OrderDetailCreateDto): OrderDetailEntity {
    return this.mapper.map<OrderDetailCreateDto, OrderDetailEntity>(
      dto,
      OrderDetailCreateDto,
      OrderDetailEntity,
    );
  }

  override mapCreateArrayToEntity(dto: OrderDetailCreateDto[]): OrderDetailEntity[] {
    return this.mapper.mapArray<OrderDetailCreateDto, OrderDetailEntity>(
      dto,
      OrderDetailCreateDto,
      OrderDetailEntity,
    );
  }

  override mapCreateUpdateArrayToEntity(dto: OrderDetailUpdateDto[]): OrderDetailEntity[] {
    return this.mapper.mapArray<OrderDetailUpdateDto, OrderDetailEntity>(
      dto,
      OrderDetailUpdateDto,
      OrderDetailEntity,
    );
  }
}
