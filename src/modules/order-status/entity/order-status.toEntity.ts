import { AutoMap } from '@automapper/classes';
import { Exclude } from 'class-transformer';
import { EntityBase } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('OrderStatus')
@Exclude()
export class OrderStatusEntity extends EntityBase {
  @Column()
  @AutoMap()
  name: string;
}