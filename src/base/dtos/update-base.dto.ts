import { ApiProperty } from "@nestjs/swagger";
import { BaseCreateDto } from "./create-base.dto";


export abstract class BaseUpdateDto extends BaseCreateDto {
  @ApiProperty()
  private id?: number;
}