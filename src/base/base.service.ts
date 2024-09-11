import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import { EntityBase } from "./base.entity";
import { IBaseService } from "./interfaces/base-service.interface";
import { findByField } from "./utils/find-by-field.utils";
import { PaginationConstants } from "./constants/pagination.enum";


export abstract class BaseService<
  T extends EntityBase,
> implements IBaseService<T>
{
  constructor(
    private readonly repository: Repository<T>,
  ) {}

  async findAll(condition = { isDeleted: false }): Promise<T[]> {
    const where: FindManyOptions<T> = { where: condition as FindOptionsWhere<T> };
    return this.repository.find(where);
  }

  async paginate(take, skip, condition = { isDeleted: false }): Promise<any> {
    const queryTake = Number(take) || PaginationConstants.DEFAULT_TAKE;
    const querySkip = Number(skip) || PaginationConstants.DEFAULT_SKIP;

    const where: FindOptionsWhere<T> = { isDeleted: condition.isDeleted } as FindOptionsWhere<T>;

    const [result, total] = await this.repository.findAndCount({
      where,
      //order: { createdAt: -1 },
      take: queryTake,
      skip: querySkip
    });
    return {
      data: result,
      count: total
    };
  }

  async findOne(id: number): Promise<T> {
    // throws error 404 if not found
    const entity = await findByField(this.repository, { id: +id }, true);
    return entity;
    //return this.repository.findOne(id);
  }
  /**
   *
   * @param data : the CreateDTO of the submitted entity
   * @returns : The created entity
   */
  async create(data: T): Promise<T> {
    data.isDeleted = false;
    // if (this.request.user) {
      data.userCreated = 1;
      data.userUpdated = 1;
    // }
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  /**
   *
   * @param id : the ID of the entity
   * @param dto : the DTO to be assigned for the entity
   * @returns : The modified entity
   */
  async update(id: number, data: T): Promise<T> {
    // if (this.request.user) {
      data.userUpdated = 1;
    // }
    data = await this.repository.preload({
      id: (await findByField(this.repository, { id: id }, true)).id,
      ...data
    } as any);

    return this.repository.save(data as any);
  }

  async delete(id: number): Promise<void> {
    await findByField(this.repository, { id }, true);
    await this.repository.delete(id);
  }

  /**
   *
   * @param id : number of the given entity
   * This method applies logical deletion or restoration from the database by setting the isDeleted to true or false
   */
  async updateStatus(id: number, isDeleted: boolean): Promise<T> {
    let entity = {} as T;
    entity = await findByField(this.repository, { id }, true);
    entity.isDeleted = isDeleted;
    // if (this.request.user) {
      entity.userUpdated = 1;
    // }
    return await this.repository.save(entity as any);
  }

  /**
   * This method deletes permanently from the database
   */
  async clear(): Promise<void> {
    try {
      await this.repository.clear();
    } catch (error) {
      if (error.name === 'MongoError' && error.code === 26) {
        // Handle "is not found" error
        // Perform alternative logic or error handling
        console.log('Collection does not exist. Unable to clear.');
      } else {
        // Handle other errors
        console.log('An error occurred:', error);
      }
    }
  }

//   async search(data: QueryDto<T>): Promise<SearchResponse<T>> {
//     const query: FindManyOptions<T> = { where: {} }; // initialize query to an empty object

//     const queryTake = +data.take || PaginationConstants.DEFAULT_TAKE;
//     const querySkip = +data.skip || PaginationConstants.DEFAULT_SKIP;
//     const filterCriteria = data.attributes.map(attribute => {
//       return {
//         [attribute.key]:
//           attribute.comparator == ComparatorEnum.EQUALS
//             ? attribute.value
//             : attribute.comparator == ComparatorEnum.LIKE
//             ? RegExp(`^${attribute.value}`, 'i')
//             : attribute.value
//       };
//     });
//     query.where =
//       data.type.toUpperCase() === ComparaisonTypeEnum.AND ? { $and: filterCriteria } : { $or: filterCriteria };
//     const [result, total] = await this.repository.findAndCount({
//       where: query.where,
//       order: data.orders,
//       ...(data.isPaginable == true || data.isPaginable == undefined
//         ? {
//             take: queryTake,
//             skip: querySkip
//           }
//         : {})
//     });
//     return {
//       data: result,
//       count: total,
//       ...(data.isPaginable == true || data.isPaginable == undefined
//         ? {
//             page: querySkip,
//             totalPages: total == queryTake ? Math.trunc(total / queryTake) : Math.trunc(total / queryTake + 1)
//           }
//         : {})
//     };
//   }
}