import { ApiProperty } from "@nestjs/swagger";
import { BaseCreateDto } from "./create-base.dto";
import { AutoMap } from "@automapper/classes";


export abstract class BaseUpdateDto extends BaseCreateDto {
  @ApiProperty()
  @AutoMap()
  private id?: number;
}