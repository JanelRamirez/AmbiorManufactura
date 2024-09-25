import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public entityName: string;

  @Column()
  public entityId: number;

  @Column({ type: 'nvarchar', length: 'max' })
  public oldValues: any;

  @Column({ type: 'nvarchar', length: 'max' })
  public newValues: any;

  @Column()
  public actionType: string;

  @Column()
  public timestamp?: Date;
}
