import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseUpdateDto } from "src/base/dtos/update-base.dto";

export class InventoryUpdateDto extends BaseUpdateDto {
  @AutoMap()
  productId: number;

  @AutoMap()
  quantity: number;
  
  @AutoMap()
  warehouseLocation: string;
  }