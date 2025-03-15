import { AutoMap } from '@automapper/classes';
import { ResponseBaseDto } from 'src/base/dtos/response-base.dto';

export class UserResponseDto extends ResponseBaseDto {
  @AutoMap()
  name: string;

  @AutoMap()
  email: string

  @AutoMap()
  address: string

  @AutoMap()
  rol: string

  @AutoMap()
  nui: string

  @AutoMap()
  birthdate: Date

  @AutoMap()
  phone: string
}