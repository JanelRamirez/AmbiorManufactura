import { createMap, Mapper, forMember, ignore } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { MappingProfile } from "src/core/shared/decorators/mapping-profile.decorator";
import { ProductionCreateDto } from "./dtos/create-production.dto";
import { ProductionUpdateDto } from "./dtos/update-production.dto";
import { ProductionEntity } from "./entity/production.toEntity";
import { ProductionResponseDto } from './dtos/response-production.dto';


@Injectable()
@MappingProfile()
export class ProductionProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      // Mapping from ProductionEntity to ProductionResponseDto
      createMap(mapper, ProductionEntity, ProductionResponseDto);

      // Mapping from ProductionCreateDto to ProductionEntity with custom rules
      createMap(mapper, ProductionCreateDto, ProductionEntity, forMember((d) => d.id, ignore()));

      // Mapping from ProductionUpdateDto to ProductionEntity with custom rules
      createMap(mapper, ProductionUpdateDto, ProductionEntity, forMember((d) => d.id, ignore()));
    };
  }
}
