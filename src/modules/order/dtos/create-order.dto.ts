import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseCreateDto } from "src/base/dtos/create-base.dto";
import { InvoiceEntity } from "src/modules/invoice/entity/invoice.toEntity";
import { OrderDetailEntity } from "src/modules/order-detail/entity/order-detail.toEntity";

export class OrderCreateDto extends BaseCreateDto {
  @AutoMap()
  userId: number;

  @AutoMap()
  total: number;

  @AutoMap()
  advancePaid: number;

  @AutoMap()
  status: string;

  @AutoMap()
  orderDate: Date;

  @AutoMap()
  estimatedDeliveryDate: Date;

  @AutoMap()
  shippingAddress: string;

  @AutoMap()
  paymentMethod: string;

  @AutoMap()
  statusId: number;

  @AutoMap()
  orderDetails: OrderDetailEntity[];

  @AutoMap()
  invoices: InvoiceEntity[];
  }