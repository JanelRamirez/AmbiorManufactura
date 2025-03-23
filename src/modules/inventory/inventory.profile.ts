import { createMap, Mapper, forMember, ignore } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { MappingProfile } from "src/core/shared/decorators/mapping-profile.decorator";
import { InventoryCreateDto } from "./dtos/create-inventory.dto";
import { InventoryUpdateDto } from "./dtos/update-inventory.dto";
import { InventoryEntity } from "./entity/inventory.toEntity";
import { InventoryResponseDto } from './dtos/response-inventory.dto';


@Injectable()
@MappingProfile()
export class InventoryProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      // Mapping from InventoryEntity to InventoryResponseDto
      createMap(mapper, InventoryEntity, InventoryResponseDto);

      // Mapping from InventoryCreateDto to InventoryEntity with custom rules
      createMap(mapper, InventoryCreateDto, InventoryEntity, forMember((d) => d.id, ignore()));

      // Mapping from InventoryUpdateDto to InventoryEntity with custom rules
      createMap(mapper, InventoryUpdateDto, InventoryEntity, forMember((d) => d.id, ignore()));
    };
  }
}
