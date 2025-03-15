import { AutoMap } from '@automapper/classes';
import { Exclude } from 'class-transformer';
import { EntityBase } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
@Exclude()
export class UserEntity extends EntityBase {
  @Column({nullable: false})
  @AutoMap()
  name: string;

  @Column({nullable: false})
  @AutoMap()
  email: string

  @Column({nullable: false})
  @AutoMap()
  password: string

  @Column({nullable: false})
  @AutoMap()
  address: string

  @Column({nullable: false})
  @AutoMap()
  rol: string

  @Column({nullable: false})
  @AutoMap()
  nui: string

  @Column({nullable: true})
  @AutoMap()
  birthdate: Date

  @Column({nullable: false})
  @AutoMap()
  phone: string
}