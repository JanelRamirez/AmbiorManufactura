import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseUpdateDto } from "src/base/dtos/update-base.dto";

export class UserUpdateDto extends BaseUpdateDto {
    @ApiProperty()
    @AutoMap()
    name: string;
  }