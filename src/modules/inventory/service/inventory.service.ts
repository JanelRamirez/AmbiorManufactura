import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { InventoryEntity } from "../entity/inventory.toEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class InventoryService extends BaseService<InventoryEntity> {
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly _InventoryRepository: Repository<InventoryEntity>
  ) {
    super(_InventoryRepository);
  }
}