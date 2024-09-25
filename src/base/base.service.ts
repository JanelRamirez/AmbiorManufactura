import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { EntityBase } from './base.entity';
import { IBaseService } from './interfaces/base-service.interface';
import { findByField } from './utils/find-by-field.utils';
import { PaginationConstants } from './constants/pagination.enum';
import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthJwtService } from 'src/auth-permission/services/auth-jwt.service';
import { Employee } from 'src/auth-permission/models/employee';

export abstract class BaseService<T extends EntityBase>
  implements IBaseService<T>
{
  constructor(
    private readonly repository: Repository<T>,
    @Inject(REQUEST) public readonly request: any,
    private readonly _authService: AuthJwtService,
  ) {}

  async findAll(condition = { isDeleted: false }): Promise<T[]> {
    const where: FindManyOptions<T> = {
      where: condition as FindOptionsWhere<T>,
    };
    return this.repository.find(where);
  }

  async paginate(take, skip, condition = { isDeleted: false }): Promise<any> {
    const queryTake = Number(take) || PaginationConstants.DEFAULT_TAKE;
    const querySkip = Number(skip) || PaginationConstants.DEFAULT_SKIP;

    const where: FindOptionsWhere<T> = {
      isDeleted: condition.isDeleted,
    } as FindOptionsWhere<T>;

    const [result, total] = await this.repository.findAndCount({
      where,
      //order: { createdAt: -1 },
      take: queryTake,
      skip: querySkip,
    });
    return {
      data: result,
      count: total,
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
    const user = this.getUser();
    if (user) {
      data.userCreated = +user.Empleado;
      data.userUpdated = +user.Empleado;
    }
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
    const user = this.getUser();
    if (user) {
      data.userUpdated = +user.Empleado;
    }
    data = await this.repository.preload({
      id: (await findByField(this.repository, { id: id }, true)).id,
      ...data,
    } as any);

    return this.repository.save(data as any);
  }

  /**
   *
   * @param id : number of the given entity
   * This method applies logical deletion
   */
  async delete(id: number): Promise<T> {
    let entity = {} as T;
    entity = await findByField(this.repository, { id }, true);
    entity.isDeleted = true;
    const user = this.getUser();
    if (user) {
      entity.userUpdated = +user.Empleado;
    }
    return await this.repository.save(entity as any);
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

  private getUser(): Employee {
    const token = this.request.headers.authorization;
    return this._authService.validateToken(token);
  }
}
