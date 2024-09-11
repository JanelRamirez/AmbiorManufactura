import { AutoMap } from '@automapper/classes';
import { Exclude } from 'class-transformer';
import { EntityBase } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('category')
@Exclude()
export class CategoryEntity extends EntityBase {
  @Column()
  @AutoMap()
  name: string;

  @Column()
  @AutoMap()
  quantity: number;
}