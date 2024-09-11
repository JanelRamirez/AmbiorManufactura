import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Type,
} from '@nestjs/common';
import { EntityBase } from './base.entity';
import { IBaseController } from './interfaces/base-controller.interface';
import { ApiBody } from '@nestjs/swagger';
import { IBaseService } from './interfaces/base-service.interface';
import { MapperService } from 'src/core/shared/providers/mapper.service';

export function BaseController<T extends EntityBase, createDto, updateDto>(
  createDto: Type<createDto>,
  updateDto: Type<updateDto>,
): Type<IBaseController<T, createDto, updateDto>> {
  class GenericsController<T extends EntityBase, createDto, updateDto>
    implements IBaseController<T, createDto, updateDto>
  {
    protected mapperService: MapperService;
    constructor(
      private readonly service: IBaseService<T, createDto, updateDto>,
      mapperService: MapperService,
    ) {
      this.mapperService = mapperService;
    }

    @Get()
    async findAll(): Promise<T[]> {
      return this.service.findAll();
    }

    @Get('paginate')
    async paginate(@Query('take') take, @Query('skip') skip): Promise<T[]> {
      return this.service.paginate(+take, +skip);
    }

    @Get('find/:id')
    @ApiBody({ required: true, description: 'fetches the entity by ID' })
    async findOne(@Param('id') id: number): Promise<T> {
      return this.service.findOne(id);
    }

    @Post()
    async create(@Body() dto: createDto): Promise<T> {
      return this.service.create(dto);
    }

    @Put(':id')
    async update(@Param() params, @Body() dto: updateDto): Promise<T> {
      return this.service.update(params.id, dto);
    }

    @Delete(':id')
    async delete(@Param() params): Promise<void> {
      return this.service.delete(params.id);
    }
  }
  return GenericsController;
}
