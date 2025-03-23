import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseUpdateDto } from "src/base/dtos/update-base.dto";

export class ProductionUpdateDto extends BaseUpdateDto {
  @AutoMap()
  quantityProduced: number;
  
  @AutoMap()
  productionDate: Date;

  @AutoMap()
  productId: number;
  }