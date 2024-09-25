import {
  Body,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { EntityBase } from './base.entity';
import { BaseService } from './base.service';
import { BaseCreateDto } from './dtos/create-base.dto';
import { BaseUpdateDto } from './dtos/update-base.dto';
import { ValidatorBase } from './base.validator';
import { BaseMapper } from './base.mapper';
import { isEmptyObject } from './utils/empty-object.util';

export class BaseController<
  TEntity extends EntityBase,
  TDto extends BaseCreateDto,
  TUpdateDto extends BaseUpdateDto,
> {
  private readonly _mapper: BaseMapper<TEntity, TDto, TUpdateDto>;
  private readonly _validator: ValidatorBase<TEntity>;
  constructor(
    private readonly baseService: BaseService<TEntity>,
    mapper: BaseMapper<TEntity, TDto, TUpdateDto>,
    validator: ValidatorBase<TEntity>,
  ) {
    this._mapper = mapper;
    this._validator = validator;
  }

  @Post()
  async create(@Request() req: any, @Body() dto: TDto) {
    try {
      const entity: TEntity = this._mapper.mapToEntity(dto);
      const validationErrors = await this._validator.validateAsync(entity);
      if (!isEmptyObject(validationErrors))
        throw new HttpException(
          {
            reason: 'Required fields were not provided.',
            fields: validationErrors,
          },
          HttpStatus.BAD_REQUEST,
        );
      return await this.baseService.create(entity);
    } catch (ex) {
      throw ex;
    }
  }

  @Get()
  async findAll(): Promise<TDto[]> {
    try {
      const data = await this.baseService
        .findAll()
        .then((res) => {
          return this._mapper.arrayMapToDto(res);
        })
        .catch((err) => {
          throw new HttpException(
            `Error fetching all: ${err.message}`,
            err.status || HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });

      return data;
    } catch (ex) {
      throw ex;
    }
  }

  // @Post('paginated')
  // async findAllPaginated(
  //   @Body() requestPaginated: RequestPaginated,
  // ): Promise<ResponsePaginated<TDto>> {
  //   try {
  //     const data = await this.baseService
  //       .findAllPaginated(requestPaginated)
  //       .then((res) => {
  //         const mappedResult = this._mapper.arrayMapToDto(res.results);
  //         const result = new ResponsePaginated<TDto>(
  //           mappedResult,
  //           res.totalItems,
  //           res.totalItemsFiltered,
  //           res.totalPages,
  //           res.currentPage,
  //           res.nextPage,
  //           res.previousPage,
  //         );
  //         return result;
  //       })
  //       .catch((err) => {
  //         throw new HttpException(
  //           `Error fetching all: ${err.message}`,
  //           err.status || HttpStatus.INTERNAL_SERVER_ERROR,
  //         );
  //       });

  //     return data;
  //   } catch (ex) {
  //     throw ex;
  //   }
  // }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TDto> {
    try {
      const data = await this.baseService
        .findOne(+id)
        .then((res) => {
          return this._mapper.mapToDto(res);
        })
        .catch((err) => {
          throw new HttpException(
            `Error fetching one: ${err.message}`,
            err.status || HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });
      return data;
    } catch (ex) {
      throw ex;
    }
  }

  @Patch(':id')
  async update(@Request() req: any, @Param('id') id: string, @Body() dto: TDto) {
    try {
      const entity: TEntity = this._mapper.mapToEntity(dto);
      this.removeUndefinedAndIdProperties(entity);

      const validationErrors = await this._validator.validateAsync(entity);
      if (!isEmptyObject(validationErrors)) {
        throw new HttpException(
          {
            reason: 'Required fields were not provided.',
            fields: validationErrors,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.baseService.update(+id, entity);
    } catch (ex) {
      throw ex;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.baseService.delete(+id);
  }

  removeUndefinedAndIdProperties(obj: any): void {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (
          obj[prop] === undefined ||
          obj[prop] === null ||
          (Array.isArray(obj[prop]) && !obj[prop].length) ||
          obj[prop] === ''
        ) {
          delete obj[prop];
        }
      }
    }
  }
}
