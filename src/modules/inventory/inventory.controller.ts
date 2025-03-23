import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { InventoryEntity } from './entity/inventory.toEntity';
import { InventoryCreateDto } from './dtos/create-inventory.dto';
import { InventoryUpdateDto } from './dtos/update-inventory.dto';
import { InventoryResponseDto } from './dtos/response-inventory.dto';
import { InventoryService } from './service/inventory.service';
import { InventoryMapper } from './inventory.mapper';
import { InventoryValidator } from './inventory.validator';

@Controller('api/inventory')
@ApiTags('inventory')
export class InventoryController extends BaseController<
  InventoryEntity,
  InventoryCreateDto,
  InventoryUpdateDto,
  InventoryResponseDto
> 
{
  constructor(
    private readonly _InventoryService: InventoryService,
    private readonly _InventoryMapper: InventoryMapper,
    private readonly _InventoryValidator: InventoryValidator,
  ) {
    super(_InventoryService, _InventoryMapper, _InventoryValidator);
  }
}
