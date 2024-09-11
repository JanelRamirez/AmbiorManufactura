import { EntityBase } from "../base.entity";


export interface IBaseController<T extends EntityBase, createDto, updateDto> {
  findAll(): Promise<T[]>;
  paginate(take: number, skip: number): Promise<T[]>;
  create(entity: createDto): Promise<T>;
  update(_id: number, entity: updateDto): Promise<T>;
  findOne(_id: number): Promise<T>;
//   archive(_id: number): Promise<T>;
//   unarchive(_id: number): Promise<T>;
  delete(_id: number): Promise<void>;
//   clear(): Promise<void>;
//   search(query: QueryDto<T>);
}