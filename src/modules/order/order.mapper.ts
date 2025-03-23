import { OrderCreateDto } from './dtos/create-order.dto';
import { OrderUpdateDto } from './dtos/update-order.dto';
import { OrderEntity } from './entity/order.toEntity';
import { OrderResponseDto } from './dtos/response-order.dto';
import { BaseMapper } from 'src/base/base.mapper';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';

@Injectable()
export class OrderMapper extends BaseMapper<
  OrderEntity,
  OrderCreateDto,
  OrderUpdateDto,
  OrderResponseDto
> {
  constructor(@InjectMapper() private mapper: Mapper) {
    super(mapper);
  }

  override mapEntityToResponse(entity: OrderEntity): OrderResponseDto {
    return this.mapper.map<OrderEntity, OrderResponseDto>(
      entity,
      OrderEntity,
      OrderResponseDto,
    );
  }

  override mapArrayToResponse(entity: OrderEntity[]): OrderResponseDto[] {
    return this.mapper.mapArray<OrderEntity, OrderResponseDto>(
      entity,
      OrderEntity,
      OrderResponseDto,
    );
  }

  override mapUpdateDtoToEntity(entity: OrderUpdateDto): OrderEntity {
    return this.mapper.map<OrderUpdateDto, OrderEntity>(
      entity,
      OrderUpdateDto,
      OrderEntity,
    );
  }

  override mapCreateDtoToEntity(dto: OrderCreateDto): OrderEntity {
    return this.mapper.map<OrderCreateDto, OrderEntity>(
      dto,
      OrderCreateDto,
      OrderEntity,
    );
  }

  override mapCreateArrayToEntity(dto: OrderCreateDto[]): OrderEntity[] {
    return this.mapper.mapArray<OrderCreateDto, OrderEntity>(
      dto,
      OrderCreateDto,
      OrderEntity,
    );
  }

  override mapCreateUpdateArrayToEntity(dto: OrderUpdateDto[]): OrderEntity[] {
    return this.mapper.mapArray<OrderUpdateDto, OrderEntity>(
      dto,
      OrderUpdateDto,
      OrderEntity,
    );
  }
}
