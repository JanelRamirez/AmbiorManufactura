import { AutoMap } from '@automapper/classes';
import { Exclude } from 'class-transformer';
import { EntityBase } from 'src/base/base.entity';
import { ProductEntity } from 'src/modules/product/entity/product.toEntity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('Production')
@Exclude()
export class ProductionEntity extends EntityBase {
  
  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantityProduced: number;
  
  @AutoMap()
  @Column({ type: 'date' })
  productionDate: Date;

  @AutoMap()
  @Column()
  productId: number;

  @ManyToOne(() => ProductEntity, product => product.productions)
  product: ProductEntity;
}