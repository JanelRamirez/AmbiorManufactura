import { Employee } from "src/auth-permission/models/employee";
import { UpdateResult } from "typeorm";

export interface IBaseService<T> {
  findAll(condtion: Partial<T>): Promise<T[]>;
  paginate(take: number, skip: number, condition: Partial<T>): Promise<T[]>;
  create(entity: T): Promise<T>;
  createRange(entity: Array<T>): Promise<Array<T>>;
  update(_id: number, entity: T): Promise<T>;
  findOne(_id: number): Promise<T>;
  delete(_id: number): Promise<UpdateResult>;
  assignUser(entity: T | T[], user: Employee, isCreate: boolean): T | T[];
  // delete(_id: number): Promise<void>;
  //   search(data?: QueryDto<T>);
}
