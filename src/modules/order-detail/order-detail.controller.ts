import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { OrderDetailEntity } from './entity/order-detail.toEntity';
import { OrderDetailCreateDto } from './dtos/create-order-detail.dto';
import { OrderDetailUpdateDto } from './dtos/update-order-detail.dto';
import { OrderDetailResponseDto } from './dtos/response-order-detail.dto';
import { OrderDetailService } from './service/order-detail.service';
import { OrderDetailMapper } from './order-detail.mapper';
import { OrderDetailValidator } from './order-detail.validator';

@Controller('api/order-detail')
@ApiTags('order-detail')
export class OrderDetailController extends BaseController<
  OrderDetailEntity,
  OrderDetailCreateDto,
  OrderDetailUpdateDto,
  OrderDetailResponseDto
> 
{
  constructor(
    private readonly _OrderDetailService: OrderDetailService,
    private readonly _OrderDetailMapper: OrderDetailMapper,
    private readonly _OrderDetailValidator: OrderDetailValidator,
  ) {
    super(_OrderDetailService, _OrderDetailMapper, _OrderDetailValidator);
  }
}
