import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { EmpleadoDto } from './empleado.dto';
import { Empleado } from './empleado.entity';
import { MappingProfile } from 'src/core/shared/decorators/mapping-profile.decorator';

@Injectable()
@MappingProfile()
export class EmpleadoProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, Empleado, EmpleadoDto);
      createMap(mapper, EmpleadoDto, Empleado);
    };
  }
}
