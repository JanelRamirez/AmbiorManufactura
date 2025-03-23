import { AutoMap } from '@automapper/classes';
import { ResponseBaseDto } from 'src/base/dtos/response-base.dto';
import { ProductEntity } from 'src/modules/product/entity/product.toEntity';

export class InventoryResponseDto extends ResponseBaseDto {

  @AutoMap()
  productId: number;

  @AutoMap()
  quantity: number;
  
  @AutoMap()
  warehouseLocation: string;

  @AutoMap()
  product: ProductEntity;
}