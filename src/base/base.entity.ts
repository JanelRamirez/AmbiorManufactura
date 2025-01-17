import { AutoMap } from "@automapper/classes";
import { BeforeInsert, BeforeUpdate, Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class EntityBase {
  @PrimaryGeneratedColumn()
  @AutoMap()
  public id: number;

  @Column()
  public isDeleted: boolean;

  @Column()
  public userCreated?: number;

  @Column()
  protected createdAt: Date;

  @Column()
  public userUpdated?: number;

  @Column()
  protected lastUpdateAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  private beforeActions() {
    this.lastUpdateAt = new Date();
    this.userUpdated = this.userUpdated || 0;
  }

  @BeforeInsert()
  private beforeInsertActions() {
    this.createdAt = new Date();
    this.userCreated = this.userCreated || 0;
  }
}