import { createMap, Mapper, forMember, ignore } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { MappingProfile } from "src/core/shared/decorators/mapping-profile.decorator";
import { InvoiceCreateDto } from "./dtos/create-invoice.dto";
import { InvoiceUpdateDto } from "./dtos/update-invoice.dto";
import { InvoiceEntity } from "./entity/invoice.toEntity";
import { InvoiceResponseDto } from './dtos/response-invoice.dto';


@Injectable()
@MappingProfile()
export class InvoiceProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      // Mapping from InvoiceEntity to InvoiceResponseDto
      createMap(mapper, InvoiceEntity, InvoiceResponseDto);

      // Mapping from InvoiceCreateDto to InvoiceEntity with custom rules
      createMap(mapper, InvoiceCreateDto, InvoiceEntity, forMember((d) => d.id, ignore()));

      // Mapping from InvoiceUpdateDto to InvoiceEntity with custom rules
      createMap(mapper, InvoiceUpdateDto, InvoiceEntity, forMember((d) => d.id, ignore()));
    };
  }
}
