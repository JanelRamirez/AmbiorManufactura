import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseUpdateDto } from "src/base/dtos/update-base.dto";

export class CategoryUpdateDto extends BaseUpdateDto {
    @ApiProperty()
    @AutoMap()
    name: string;
  
    @ApiProperty()
    @AutoMap()
    quantity: number;
  }