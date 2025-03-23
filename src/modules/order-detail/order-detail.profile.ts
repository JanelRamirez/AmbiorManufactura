import { createMap, Mapper, forMember, ignore } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { MappingProfile } from "src/core/shared/decorators/mapping-profile.decorator";
import { OrderDetailCreateDto } from "./dtos/create-order-detail.dto";
import { OrderDetailUpdateDto } from "./dtos/update-order-detail.dto";
import { OrderDetailEntity } from "./entity/order-detail.toEntity";
import { OrderDetailResponseDto } from './dtos/response-order-detail.dto';


@Injectable()
@MappingProfile()
export class OrderDetailProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      // Mapping from OrderDetailEntity to OrderDetailResponseDto
      createMap(mapper, OrderDetailEntity, OrderDetailResponseDto);

      // Mapping from OrderDetailCreateDto to OrderDetailEntity with custom rules
      createMap(mapper, OrderDetailCreateDto, OrderDetailEntity, forMember((d) => d.id, ignore()));

      // Mapping from OrderDetailUpdateDto to OrderDetailEntity with custom rules
      createMap(mapper, OrderDetailUpdateDto, OrderDetailEntity, forMember((d) => d.id, ignore()));
    };
  }
}
