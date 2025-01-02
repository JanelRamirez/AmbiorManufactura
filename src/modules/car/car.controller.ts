import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { CarEntity } from './entity/car.toEntity';
import { CarCreateDto } from './dtos/create-car.dto';
import { CarUpdateDto } from './dtos/update-car.dto';
import { CarService } from './service/car.service';
import { CarMapper } from './car.mapper';
import { CarValidator } from './car.validator';

//change de name of the controller
@Controller('api/car')
//change the api tag
@ApiTags('car')
export class CarController extends BaseController<
  CarEntity,
  CarCreateDto,
  CarUpdateDto
> 
{
  constructor(
    private readonly _CarService: CarService,
    private readonly _CarMapper: CarMapper,
    private readonly _CarValidator: CarValidator,
  ) {
    super(_CarService, _CarMapper, _CarValidator);
  }
}
