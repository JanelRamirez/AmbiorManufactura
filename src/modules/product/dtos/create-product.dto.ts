import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseCreateDto } from "src/base/dtos/create-base.dto";

export class ProductCreateDto extends BaseCreateDto {
    @ApiProperty()
    @AutoMap()
    name: string;
  }