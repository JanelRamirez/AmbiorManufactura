import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseCreateDto } from "src/base/dtos/create-base.dto";

export class CategoryCreateDto extends BaseCreateDto {
    @ApiProperty()
    @AutoMap()
    name: string;
  
    @ApiProperty()
    @AutoMap()
    quantity: number;
  }