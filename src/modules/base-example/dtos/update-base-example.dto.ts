import { ApiProperty } from "@nestjs/swagger";
import { BaseUpdateDto } from "src/base/dtos/update-base.dto";

export class CategoryUpdateDto extends BaseUpdateDto {
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    quantity: number;
  }