import { createMap, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { MappingProfile } from "src/core/shared/decorators/mapping-profile.decorator";
import { CarCreateDto } from "./dtos/create-car.dto";
import { CarUpdateDto } from "./dtos/update-car.dto";
import { CarEntity } from "./entity/car.toEntity";


@Injectable()
@MappingProfile()
export class CarProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CarEntity, CarCreateDto);
      createMap(mapper, CarCreateDto, CarEntity);
      createMap(mapper, CarUpdateDto, CarEntity);
      createMap(mapper, CarEntity, CarUpdateDto);
    };
  }
}
