import { AutoMap } from "@automapper/classes";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class EntityBase {
  @PrimaryGeneratedColumn()
  @AutoMap()
  public id: number;

  @DeleteDateColumn()
  public deletedDate: Date

  @Column()
  public userCreated?: number;

  @CreateDateColumn()
  protected createdAt: Date;

  @Column()
  public userUpdated?: number;

  @UpdateDateColumn()
  protected lastUpdateAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  private beforeActions() {
    this.userUpdated = this.userUpdated || 0;
  }

  @BeforeInsert()
  private beforeInsertActions() {
    this.userCreated = this.userCreated || 0;
  }
}