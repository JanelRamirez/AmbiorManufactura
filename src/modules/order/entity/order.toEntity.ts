import { AutoMap } from '@automapper/classes';
import { Exclude } from 'class-transformer';
import { EntityBase } from 'src/base/base.entity';
import { InvoiceEntity } from 'src/modules/invoice/entity/invoice.toEntity';
import { OrderDetailEntity } from 'src/modules/order-detail/entity/order-detail.toEntity';
import { OrderStatusEntity } from 'src/modules/order-status/entity/order-status.toEntity';
import { UserEntity } from 'src/modules/user/entity/user.toEntity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('Orders')
@Exclude()
export class OrderEntity extends EntityBase {
  @Column()
  userId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;  // Total del pedido (incluye anticipo y pago final)

  @Column()
  advancePaid: number;  // Monto del anticipo pagado

  @Column({ type: 'date' })
  orderDate: Date;

  @Column({ type: 'date', nullable: true })
  estimatedDeliveryDate: Date;

  @Column({ type: 'varchar', length: 255 })
  shippingAddress: string;

  @Column({ type: 'varchar', length: 50 })
  paymentMethod: string;

  @Column()
  statusId: number;

  @OneToMany(() => OrderDetailEntity, orderDetail => orderDetail.order)
  orderDetails: OrderDetailEntity[];

  @OneToMany(() => InvoiceEntity, invoice => invoice.order)
  invoices: InvoiceEntity[];

  @ManyToOne(() => UserEntity, user => user.orders)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => OrderStatusEntity)
  @JoinColumn({ name: 'statusId' })
  status: OrderStatusEntity;
}