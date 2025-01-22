import { FindManyOptions, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { EntityBase } from './base.entity';
import { IBaseService } from './interfaces/base-service.interface';
import { findByField } from './utils/find-by-field.utils';
import { PaginationConstants } from './constants/pagination.enum';
import { Employee } from 'src/auth-permission/models/employee';
import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class BaseService<T extends EntityBase>
  implements IBaseService<T>
{
  constructor(
    private readonly repository: Repository<T>
  ) {}

  async findAll(condition: Partial<T>): Promise<T[]> {
    const where: FindManyOptions<T> = {
      where: condition as FindOptionsWhere<T>,
    };
    return this.repository.find(where);
  }

  async paginate(take, skip, condition: Partial<T>): Promise<any> {
    const queryTake = Number(take) || PaginationConstants.DEFAULT_TAKE;
    const querySkip = Number(skip) || PaginationConstants.DEFAULT_SKIP;

    const where: FindOptionsWhere<T> = {
      ...condition
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
  }

  /**
   *
   * @param data : the CreateDTO of the submitted entity
   * @returns : The created entity
   */
  async create(data: T): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  /**
   *
   * @param data : the array of CreateDTO of the submitted entity
   * @returns : The created entity
   */
  async createRange(data: Array<T>): Promise<Array<T>> {
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
  async delete(id: number): Promise<UpdateResult> {
    return await this.repository.softDelete(id);
  }

  /**
 * Assigns user information (creator or updater) to one or more entities.
 * This method can handle both a single entity and an array of entities.
 *
 * @param entity - The entity or array of entities to which the user information will be assigned.
 * @param user - The user performing the operation. Must contain the `Empleado` identifier.
 * @param isCreate - Indicates if the operation is a creation (`true`) or an update (`false`).
 *                   Defaults to `true` (creation).
 * @returns The entity or array of entities with the assigned user information.
 * @throws HttpException - Throws an exception if the user is not defined.
 */
  assignUser(entity: T | T[], user: Employee, isCreate: boolean = true): T | T[] {
    if (!user) 
      throw new HttpException('User information is required.', HttpStatus.BAD_REQUEST);
    
    if(Array.isArray(entity)){
      return entity.map((entity) => this.assignUserToEntity(entity, user, isCreate));
    }else{
      return this.assignUserToEntity(entity, user, isCreate);
    }
  }

  /**
 * Assigns user information to a single entity.
 * This method is used internally by `assignUser` to avoid logic duplication.
 *
 * @param entity - The entity to which the user information will be assigned.
 * @param user - The user performing the operation. Must contain the `Empleado` identifier.
 * @param isCreate - Indicates if the operation is a creation (`true`) or an update (`false`).
 * @returns The entity with the assigned user information.
 */
  private assignUserToEntity(entity: T, user: Employee, isCretate: boolean): T {
    if(isCretate){
      entity.userCreated = +user.Empleado;
    }else{
      entity.userUpdated = +user.Empleado;
    }
    return entity;
  }
}
