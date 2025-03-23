import { AutoMap } from '@automapper/classes';
import { ResponseBaseDto } from 'src/base/dtos/response-base.dto';
import { ProductEntity } from 'src/modules/product/entity/product.toEntity';

export class ProductionResponseDto extends ResponseBaseDto {
  @AutoMap()
  id: string;

  @AutoMap()
  quantityProduced: number;
  
  @AutoMap()
  productionDate: Date;

  @AutoMap()
  product: ProductEntity;
}