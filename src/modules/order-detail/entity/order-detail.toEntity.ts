import { AutoMap } from '@automapper/classes';
import { Exclude } from 'class-transformer';
import { EntityBase } from 'src/base/base.entity';
import { OrderEntity } from 'src/modules/order/entity/order.toEntity';
import { ProductEntity } from 'src/modules/product/entity/product.toEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('OrderDetails')
@Exclude()
export class OrderDetailEntity extends EntityBase {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @AutoMap()
  quantity: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @AutoMap()
  unitPrice: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @AutoMap()
  subTotal: string;

  @Column()
  @AutoMap()
  orderId: string;

  @Column()
  @AutoMap()
  productId: string;

  @ManyToOne(() => OrderEntity, order => order.orderDetails)
  @JoinColumn({name: 'orderId'})
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, product => product.orderDetails)
  @JoinColumn({name: 'productId'})
  product: ProductEntity;
}