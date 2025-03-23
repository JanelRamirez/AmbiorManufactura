import { OrderStatusCreateDto } from './dtos/create-order-status.dto';
import { OrderStatusUpdateDto } from './dtos/update-order-status.dto';
import { OrderStatusEntity } from './entity/order-status.toEntity';
import { OrderStatusResponseDto } from './dtos/response-order-status.dto';
import { BaseMapper } from 'src/base/base.mapper';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';

@Injectable()
export class OrderStatusMapper extends BaseMapper<
  OrderStatusEntity,
  OrderStatusCreateDto,
  OrderStatusUpdateDto,
  OrderStatusResponseDto
> {
  constructor(@InjectMapper() private mapper: Mapper) {
    super(mapper);
  }

  override mapEntityToResponse(entity: OrderStatusEntity): OrderStatusResponseDto {
    return this.mapper.map<OrderStatusEntity, OrderStatusResponseDto>(
      entity,
      OrderStatusEntity,
      OrderStatusResponseDto,
    );
  }

  override mapArrayToResponse(entity: OrderStatusEntity[]): OrderStatusResponseDto[] {
    return this.mapper.mapArray<OrderStatusEntity, OrderStatusResponseDto>(
      entity,
      OrderStatusEntity,
      OrderStatusResponseDto,
    );
  }

  override mapUpdateDtoToEntity(entity: OrderStatusUpdateDto): OrderStatusEntity {
    return this.mapper.map<OrderStatusUpdateDto, OrderStatusEntity>(
      entity,
      OrderStatusUpdateDto,
      OrderStatusEntity,
    );
  }

  override mapCreateDtoToEntity(dto: OrderStatusCreateDto): OrderStatusEntity {
    return this.mapper.map<OrderStatusCreateDto, OrderStatusEntity>(
      dto,
      OrderStatusCreateDto,
      OrderStatusEntity,
    );
  }

  override mapCreateArrayToEntity(dto: OrderStatusCreateDto[]): OrderStatusEntity[] {
    return this.mapper.mapArray<OrderStatusCreateDto, OrderStatusEntity>(
      dto,
      OrderStatusCreateDto,
      OrderStatusEntity,
    );
  }

  override mapCreateUpdateArrayToEntity(dto: OrderStatusUpdateDto[]): OrderStatusEntity[] {
    return this.mapper.mapArray<OrderStatusUpdateDto, OrderStatusEntity>(
      dto,
      OrderStatusUpdateDto,
      OrderStatusEntity,
    );
  }
}
