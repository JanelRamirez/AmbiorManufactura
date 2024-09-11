import { createMap, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { MappingProfile } from "src/core/shared/decorators/mapping-profile.decorator";
import { CategoryCreateDto } from "./dtos/create-base-example.dto";
import { CategoryEntity } from "./entity/base-example.toEntity";
import { CategoryUpdateDto } from "./dtos/update-base-example.dto";


@Injectable()
@MappingProfile()
export class BaseExampleProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CategoryEntity, CategoryCreateDto);
      createMap(mapper, CategoryCreateDto, CategoryEntity);
      createMap(mapper, CategoryUpdateDto, CategoryEntity);
      createMap(mapper, CategoryEntity, CategoryUpdateDto);
    };
  }
}
