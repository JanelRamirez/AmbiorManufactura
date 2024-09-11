import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { CategoryEntity } from "../entity/base-example.toEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService extends BaseService<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>
  ) {
    super(categoryRepository);
  }
}