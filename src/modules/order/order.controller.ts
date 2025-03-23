import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { OrderEntity } from './entity/order.toEntity';
import { OrderCreateDto } from './dtos/create-order.dto';
import { OrderUpdateDto } from './dtos/update-order.dto';
import { OrderResponseDto } from './dtos/response-order.dto';
import { OrderService } from './service/order.service';
import { OrderMapper } from './order.mapper';
import { OrderValidator } from './order.validator';

@Controller('api/order')
@ApiTags('order')
export class OrderController extends BaseController<
  OrderEntity,
  OrderCreateDto,
  OrderUpdateDto,
  OrderResponseDto
> 
{
  constructor(
    private readonly _OrderService: OrderService,
    private readonly _OrderMapper: OrderMapper,
    private readonly _OrderValidator: OrderValidator,
  ) {
    super(_OrderService, _OrderMapper, _OrderValidator);
  }
}
