import { InvoiceCreateDto } from './dtos/create-invoice.dto';
import { InvoiceUpdateDto } from './dtos/update-invoice.dto';
import { InvoiceEntity } from './entity/invoice.toEntity';
import { InvoiceResponseDto } from './dtos/response-invoice.dto';
import { BaseMapper } from 'src/base/base.mapper';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';

@Injectable()
export class InvoiceMapper extends BaseMapper<
  InvoiceEntity,
  InvoiceCreateDto,
  InvoiceUpdateDto,
  InvoiceResponseDto
> {
  constructor(@InjectMapper() private mapper: Mapper) {
    super(mapper);
  }

  override mapEntityToResponse(entity: InvoiceEntity): InvoiceResponseDto {
    return this.mapper.map<InvoiceEntity, InvoiceResponseDto>(
      entity,
      InvoiceEntity,
      InvoiceResponseDto,
    );
  }

  override mapArrayToResponse(entity: InvoiceEntity[]): InvoiceResponseDto[] {
    return this.mapper.mapArray<InvoiceEntity, InvoiceResponseDto>(
      entity,
      InvoiceEntity,
      InvoiceResponseDto,
    );
  }

  override mapUpdateDtoToEntity(entity: InvoiceUpdateDto): InvoiceEntity {
    return this.mapper.map<InvoiceUpdateDto, InvoiceEntity>(
      entity,
      InvoiceUpdateDto,
      InvoiceEntity,
    );
  }

  override mapCreateDtoToEntity(dto: InvoiceCreateDto): InvoiceEntity {
    return this.mapper.map<InvoiceCreateDto, InvoiceEntity>(
      dto,
      InvoiceCreateDto,
      InvoiceEntity,
    );
  }

  override mapCreateArrayToEntity(dto: InvoiceCreateDto[]): InvoiceEntity[] {
    return this.mapper.mapArray<InvoiceCreateDto, InvoiceEntity>(
      dto,
      InvoiceCreateDto,
      InvoiceEntity,
    );
  }

  override mapCreateUpdateArrayToEntity(dto: InvoiceUpdateDto[]): InvoiceEntity[] {
    return this.mapper.mapArray<InvoiceUpdateDto, InvoiceEntity>(
      dto,
      InvoiceUpdateDto,
      InvoiceEntity,
    );
  }
}
