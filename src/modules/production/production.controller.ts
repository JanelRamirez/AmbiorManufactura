import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { ProductionEntity } from './entity/production.toEntity';
import { ProductionCreateDto } from './dtos/create-production.dto';
import { ProductionUpdateDto } from './dtos/update-production.dto';
import { ProductionResponseDto } from './dtos/response-production.dto';
import { ProductionService } from './service/production.service';
import { ProductionMapper } from './production.mapper';
import { ProductionValidator } from './production.validator';

@Controller('api/production')
@ApiTags('production')
export class ProductionController extends BaseController<
  ProductionEntity,
  ProductionCreateDto,
  ProductionUpdateDto,
  ProductionResponseDto
> 
{
  constructor(
    private readonly _ProductionService: ProductionService,
    private readonly _ProductionMapper: ProductionMapper,
    private readonly _ProductionValidator: ProductionValidator,
  ) {
    super(_ProductionService, _ProductionMapper, _ProductionValidator);
  }
}
