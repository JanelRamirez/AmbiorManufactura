import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { ProductEntity } from "../entity/product.toEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ProductService extends BaseService<ProductEntity> {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly _ProductRepository: Repository<ProductEntity>
  ) {
    super(_ProductRepository);
  }
}