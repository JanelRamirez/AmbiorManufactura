import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseCreateDto } from "src/base/dtos/create-base.dto";

export class InventoryCreateDto extends BaseCreateDto {
  @AutoMap()
  productId: number;

  @AutoMap()
  quantity: number;
  
  @AutoMap()
  warehouseLocation: string;
  }