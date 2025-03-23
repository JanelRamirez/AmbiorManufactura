import { AutoMap } from '@automapper/classes';
import { Exclude } from 'class-transformer';
import { EntityBase } from 'src/base/base.entity';
import { ProductEntity } from 'src/modules/product/entity/product.toEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('Inventories')
@Exclude()
export class InventoryEntity extends EntityBase {

  @AutoMap()
  @Column()
  productId: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity: number;
  
  @AutoMap()
  @Column({ type: 'varchar', length: 255 })
  warehouseLocation: string;

  @AutoMap()
  @ManyToOne(() => ProductEntity, product => product.inventories)
  @JoinColumn({name: 'productId'})
  product: ProductEntity;
}