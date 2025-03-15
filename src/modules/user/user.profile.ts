import { createMap, Mapper, forMember, ignore } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { MappingProfile } from "src/core/shared/decorators/mapping-profile.decorator";
import { UserCreateDto } from "./dtos/create-user.dto";
import { UserUpdateDto } from "./dtos/update-user.dto";
import { UserEntity } from "./entity/user.toEntity";
import { UserResponseDto } from './dtos/response-user.dto';


@Injectable()
@MappingProfile()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      // Mapping from UserEntity to UserResponseDto
      createMap(mapper, UserEntity, UserResponseDto);

      // Mapping from UserCreateDto to UserEntity with custom rules
      createMap(mapper, UserCreateDto, UserEntity, forMember((d) => d.id, ignore()));

      // Mapping from UserUpdateDto to UserEntity with custom rules
      createMap(mapper, UserUpdateDto, UserEntity, forMember((d) => d.id, ignore()));
    };
  }
}
