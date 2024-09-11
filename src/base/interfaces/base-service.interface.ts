export interface IBaseService<T, createDto, updateDto> {
  findAll(): Promise<T[]>;
  paginate(take: number, skip: number): Promise<T[]>;
  create(entity: createDto): Promise<T>;
  update(_id: number, entity: updateDto): Promise<T>;
  findOne(_id: number): Promise<T>;
  updateStatus(_id: number, isDeleted: boolean): Promise<T>;
  delete(_id: number): Promise<void>;
  clear(): Promise<void>;
  //   search(data?: QueryDto<T>);
}
