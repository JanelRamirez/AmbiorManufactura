import { Exclude } from 'class-transformer';
import { EntityBase } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('category')
@Exclude()
export class CategoryEntity extends EntityBase {
  @Column()
  name: string;

  @Column()
  quantity: number;
}