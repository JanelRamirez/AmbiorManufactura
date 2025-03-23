import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { ProductionEntity } from "../entity/production.toEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ProductionService extends BaseService<ProductionEntity> {
  constructor(
    @InjectRepository(ProductionEntity)
    private readonly _ProductionRepository: Repository<ProductionEntity>
  ) {
    super(_ProductionRepository);
  }
}