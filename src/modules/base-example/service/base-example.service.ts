import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { CategoryEntity } from "../entity/base-example.toEntity";
import { CategoryCreateDto } from "../dtos/create-base-example.dto";
import { CategoryUpdateDto } from "../dtos/update-base-example.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService extends BaseService<CategoryEntity, CategoryCreateDto, CategoryUpdateDto> {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>
  ) {
    super(categoryRepository);
  }
}