import { ApiProperty } from "@nestjs/swagger";
import { BaseCreateDto } from "src/base/dtos/create-base.dto";

export class CategoryCreateDto extends BaseCreateDto {
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    quantity: number;
  }