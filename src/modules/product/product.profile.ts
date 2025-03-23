import { createMap, Mapper, forMember, ignore } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { MappingProfile } from "src/core/shared/decorators/mapping-profile.decorator";
import { ProductCreateDto } from "./dtos/create-product.dto";
import { ProductUpdateDto } from "./dtos/update-product.dto";
import { ProductEntity } from "./entity/product.toEntity";
import { ProductResponseDto } from './dtos/response-product.dto';


@Injectable()
@MappingProfile()
export class ProductProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      // Mapping from ProductEntity to ProductResponseDto
      createMap(mapper, ProductEntity, ProductResponseDto);

      // Mapping from ProductCreateDto to ProductEntity with custom rules
      createMap(mapper, ProductCreateDto, ProductEntity, forMember((d) => d.id, ignore()));

      // Mapping from ProductUpdateDto to ProductEntity with custom rules
      createMap(mapper, ProductUpdateDto, ProductEntity, forMember((d) => d.id, ignore()));
    };
  }
}
