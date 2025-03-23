import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { OrderStatusEntity } from './entity/order-status.toEntity';
import { OrderStatusCreateDto } from './dtos/create-order-status.dto';
import { OrderStatusUpdateDto } from './dtos/update-order-status.dto';
import { OrderStatusResponseDto } from './dtos/response-order-status.dto';
import { OrderStatusService } from './service/order-status.service';
import { OrderStatusMapper } from './order-status.mapper';
import { OrderStatusValidator } from './order-status.validator';

//change de name of the controller
@Controller('api/order-status')
//change the api tag
@ApiTags('order-status')
export class OrderStatusController extends BaseController<
  OrderStatusEntity,
  OrderStatusCreateDto,
  OrderStatusUpdateDto,
  OrderStatusResponseDto
> 
{
  constructor(
    private readonly _OrderStatusService: OrderStatusService,
    private readonly _OrderStatusMapper: OrderStatusMapper,
    private readonly _OrderStatusValidator: OrderStatusValidator,
  ) {
    super(_OrderStatusService, _OrderStatusMapper, _OrderStatusValidator);
  }
}
