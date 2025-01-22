import { AutoMap } from '@automapper/classes';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class EntityBase {
  @PrimaryGeneratedColumn()
  @AutoMap()
  public id: number;

  @DeleteDateColumn()
  public deletedDate: Date;

  @Column()
  public userCreated?: number;

  @CreateDateColumn()
  protected createdAt: Date;

  @Column({ nullable: true })
  public userUpdated?: number;

  @UpdateDateColumn()
  protected lastUpdateAt: Date;

  @BeforeUpdate()
  private beforeActions() {
    if(!this.userUpdated){
      throw new Error('userUpdated must be set');
    }
  }

  @BeforeInsert()
  private beforeInsertActions() {
    if(!this.userCreated){
      throw new Error('userCreated must be set');
    }
  }
}
