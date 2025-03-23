import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { InvoiceEntity } from './entity/invoice.toEntity';
import { InvoiceCreateDto } from './dtos/create-invoice.dto';
import { InvoiceUpdateDto } from './dtos/update-invoice.dto';
import { InvoiceResponseDto } from './dtos/response-invoice.dto';
import { InvoiceService } from './service/invoice.service';
import { InvoiceMapper } from './invoice.mapper';
import { InvoiceValidator } from './invoice.validator';

@Controller('api/invoice')
@ApiTags('invoice')
export class InvoiceController extends BaseController<
  InvoiceEntity,
  InvoiceCreateDto,
  InvoiceUpdateDto,
  InvoiceResponseDto
> 
{
  constructor(
    private readonly _InvoiceService: InvoiceService,
    private readonly _InvoiceMapper: InvoiceMapper,
    private readonly _InvoiceValidator: InvoiceValidator,
  ) {
    super(_InvoiceService, _InvoiceMapper, _InvoiceValidator);
  }
}
