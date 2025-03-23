import { createMap, Mapper, forMember, ignore } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { MappingProfile } from "src/core/shared/decorators/mapping-profile.decorator";
import { OrderCreateDto } from "./dtos/create-order.dto";
import { OrderUpdateDto } from "./dtos/update-order.dto";
import { OrderEntity } from "./entity/order.toEntity";
import { OrderResponseDto } from './dtos/response-order.dto';


@Injectable()
@MappingProfile()
export class OrderProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      // Mapping from OrderEntity to OrderResponseDto
      createMap(mapper, OrderEntity, OrderResponseDto);

      // Mapping from OrderCreateDto to OrderEntity with custom rules
      createMap(mapper, OrderCreateDto, OrderEntity, forMember((d) => d.id, ignore()));

      // Mapping from OrderUpdateDto to OrderEntity with custom rules
      createMap(mapper, OrderUpdateDto, OrderEntity, forMember((d) => d.id, ignore()));
    };
  }
}
