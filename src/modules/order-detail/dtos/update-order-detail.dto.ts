import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseUpdateDto } from "src/base/dtos/update-base.dto";

export class OrderDetailUpdateDto extends BaseUpdateDto {
  @AutoMap()
  quantity: string;

  @AutoMap()
  unitPrice: string;

  @AutoMap()
  subTotal: string;

  @AutoMap()
  orderId: string;

  @AutoMap()
  productId: string;
  }