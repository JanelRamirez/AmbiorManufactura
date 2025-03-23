import { AutoMap } from '@automapper/classes';
import { Exclude } from 'class-transformer';
import { EntityBase } from 'src/base/base.entity';
import { OrderEntity } from 'src/modules/order/entity/order.toEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('Invoices')
@Exclude()
export class InvoiceEntity extends EntityBase {
  @AutoMap()
  @Column()
  orderId: number;  // Relación con el pedido
  
  @AutoMap()
  @Column()
  amount: number;  // Monto de la factura (puede ser el anticipo o el pago final)
  
  @AutoMap()
  @Column()
  paymentMethod: string;  // Método de pago (tarjeta, transferencia, etc.)
  
  @AutoMap()
  @Column()
  paymentStatus: string;

  @ManyToOne(() => OrderEntity, order => order.id)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;
}