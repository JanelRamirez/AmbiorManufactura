import { AutoMap } from '@automapper/classes';
import { Exclude } from 'class-transformer';
import { EntityBase } from 'src/base/base.entity';
import { InventoryEntity } from 'src/modules/inventory/entity/inventory.toEntity';
import { OrderDetailEntity } from 'src/modules/order-detail/entity/order-detail.toEntity';
import { ProductionEntity } from 'src/modules/production/entity/production.toEntity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('Products')
@Exclude()
export class ProductEntity extends EntityBase {

  @Column({ type: 'varchar', length: 255 })
  @AutoMap()
  name: string;
  
  @Column({ type: 'text', nullable: true })
  @AutoMap()
  description: string

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @AutoMap()
  @Column()
  stock: number;

  @AutoMap()
  @Column({ type: 'varchar', length: 255, nullable: true })
  imageUrl: string;

  @OneToMany(() => InventoryEntity, inventory => inventory.product)
  inventories: InventoryEntity[];

  @OneToMany(() => ProductionEntity, production => production.product)
  productions: ProductionEntity[];

  @OneToMany(() => OrderDetailEntity, orderDetail => orderDetail.order)
  orderDetails: OrderDetailEntity[];
}