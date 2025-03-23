import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseUpdateDto } from "src/base/dtos/update-base.dto";

export class ProductUpdateDto extends BaseUpdateDto {
    @ApiProperty()
    @AutoMap()
    name: string;
  }