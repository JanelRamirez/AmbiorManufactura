import { createMap, Mapper, forMember, ignore } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { MappingProfile } from "src/core/shared/decorators/mapping-profile.decorator";
import { OrderStatusCreateDto } from "./dtos/create-order-status.dto";
import { OrderStatusUpdateDto } from "./dtos/update-order-status.dto";
import { OrderStatusEntity } from "./entity/order-status.toEntity";
import { OrderStatusResponseDto } from './dtos/response-order-status.dto';


@Injectable()
@MappingProfile()
export class OrderStatusProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      // Mapping from OrderStatusEntity to OrderStatusResponseDto
      createMap(mapper, OrderStatusEntity, OrderStatusResponseDto);

      // Mapping from OrderStatusCreateDto to OrderStatusEntity with custom rules
      createMap(mapper, OrderStatusCreateDto, OrderStatusEntity, forMember((d) => d.id, ignore()));

      // Mapping from OrderStatusUpdateDto to OrderStatusEntity with custom rules
      createMap(mapper, OrderStatusUpdateDto, OrderStatusEntity, forMember((d) => d.id, ignore()));
    };
  }
}
