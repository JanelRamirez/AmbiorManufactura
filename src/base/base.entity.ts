import { BeforeInsert, BeforeUpdate, Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class EntityBase {
  @PrimaryGeneratedColumn()
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
  }

  @BeforeInsert()
  private beforeInsertActions() {
    this.createdAt = new Date();
  }
}