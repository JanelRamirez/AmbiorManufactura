import { AutoMap } from '@automapper/classes';
import { ResponseBaseDto } from 'src/base/dtos/response-base.dto';
import { OrderEntity } from 'src/modules/order/entity/order.toEntity';
import { ProductEntity } from 'src/modules/product/entity/product.toEntity';

export class OrderDetailResponseDto extends ResponseBaseDto {
  @AutoMap()
  quantity: string;

  @AutoMap()
  unitPrice: string;

  @AutoMap()
  subTotal: string;

  @AutoMap()
  order: OrderEntity;

  @AutoMap()
  product: ProductEntity;
}