import { AutoMap } from '@automapper/classes';
import { Exclude } from 'class-transformer';
import { EntityBase } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

//change the enity name
@Entity('car')
@Exclude()
export class CarEntity extends EntityBase {
  @Column()
  @AutoMap()
  name: string;
}