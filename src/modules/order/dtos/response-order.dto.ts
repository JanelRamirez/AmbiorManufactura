import { AutoMap } from '@automapper/classes';
import { ResponseBaseDto } from 'src/base/dtos/response-base.dto';
import { InvoiceEntity } from 'src/modules/invoice/entity/invoice.toEntity';
import { OrderDetailEntity } from 'src/modules/order-detail/entity/order-detail.toEntity';

export class OrderResponseDto extends ResponseBaseDto {

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