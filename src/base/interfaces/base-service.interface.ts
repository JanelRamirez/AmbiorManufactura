export interface IBaseService<T> {
  findAll(condtion: Partial<T>): Promise<T[]>;
  paginate(take: number, skip: number): Promise<T[]>;
  create(entity: T): Promise<T>;
  update(_id: number, entity: T): Promise<T>;
  findOne(_id: number): Promise<T>;
  delete(_id: number): Promise<T>;
  // delete(_id: number): Promise<void>;
  //   search(data?: QueryDto<T>);
}
