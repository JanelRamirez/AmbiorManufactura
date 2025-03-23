import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseCreateDto } from "src/base/dtos/create-base.dto";

export class OrderDetailCreateDto extends BaseCreateDto {
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