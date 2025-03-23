import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseCreateDto } from "src/base/dtos/create-base.dto";

export class ProductionCreateDto extends BaseCreateDto {
  @AutoMap()
  quantityProduced: number;
  
  @AutoMap()
  productionDate: Date;

  @AutoMap()
  productId: number;
  }