import {
  Body,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { EntityBase } from './base.entity';
import { BaseService } from './base.service';
import { BaseCreateDto } from './dtos/create-base.dto';
import { BaseUpdateDto } from './dtos/update-base.dto';
import { ValidatorBase } from './base.validator';
import { BaseMapper } from './base.mapper';
import { isEmptyObject } from './utils/empty-object.util';
import { ResponseBaseDto } from './dtos/response-base.dto';

export class BaseController<
  TEntity extends EntityBase,
  TDto extends BaseCreateDto,
  TUpdateDto extends BaseUpdateDto,
  TResponseDto extends ResponseBaseDto
> {
  private readonly _mapper: BaseMapper<TEntity, TDto, TUpdateDto, TResponseDto>;
  private readonly _validator: ValidatorBase<TEntity | TEntity[]>;
  constructor(
    private readonly baseService: BaseService<TEntity>,
    mapper: BaseMapper<TEntity, TDto, TUpdateDto, TResponseDto>,
    validator: ValidatorBase<TEntity>,
  ) {
    this._mapper = mapper;
    this._validator = validator;
  }

  @Post()
  async create(@Request() req: any, @Body() dto: TDto): Promise<TResponseDto> {
    try {
      const entity: TEntity = this._mapper.mapCreateDtoToEntity(dto);
      const validationErrors = await this._validator.validateAsync(entity);
      if (!isEmptyObject(validationErrors))
        throw new HttpException(
          {
            reason: 'Required fields were not provided.',
            fields: validationErrors,
          },
          HttpStatus.BAD_REQUEST,
        );
      const result =  await this.baseService.create(entity).then((res) => {
        return this._mapper.mapEntityToResponse(res);
      }).catch((err) => {
        throw new HttpException(
          `Error fetching all: ${err.message}`,
          err.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
      return result;
    } catch (ex) {
      throw ex;
    }
  }

  @Post('/addRange')
  async createRange(@Request() req: any, @Body() dto: Array<TDto>): Promise<Array<TResponseDto>> {
    try {
      const entity: Array<TEntity> = this._mapper.mapCreateArrayToEntity(dto);
      const validationErrors = await this._validator.validateAsync(entity);
      if (!isEmptyObject(validationErrors))
        throw new HttpException(
          {
            reason: 'Required fields were not provided.',
            fields: validationErrors,
          },
          HttpStatus.BAD_REQUEST,
        );
      const result =  await this.baseService.createRange(entity).then((res) => {
        return this._mapper.mapArrayToResponse(res);
      }).catch((err) => {
        throw new HttpException(
          `Error fetching all: ${err.message}`,
          err.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
      return result;
    } catch (ex) {
      throw ex;
    }
  }

  @Get()
  async findAll(@Query() condition: Partial<TEntity>): Promise<TResponseDto[]> {
    try {
      const data = await this.baseService
        .findAll(condition)
        .then((res) => {
          return this._mapper.mapArrayToResponse(res);
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
  async findOne(@Param('id') id: string): Promise<TResponseDto> {
    try {
      const data = await this.baseService
        .findOne(+id)
        .then((res) => {
          return this._mapper.mapEntityToResponse(res);
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
  async update(@Request() req: any, @Param('id') id: string, @Body() dto: TUpdateDto): Promise<TResponseDto> {
    try {
      const entity: TEntity = this._mapper.mapUpdateDtoToEntity(dto);
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
      const result = await this.baseService.update(+id, entity).then((res) => {
        return this._mapper.mapEntityToResponse(res);
      }).catch((err) => {
        throw new HttpException(
          `Error fetching one: ${err.message}`,
          err.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
      return result;
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
