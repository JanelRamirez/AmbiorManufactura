import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { OrderStatusEntity } from "../entity/order-status.toEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class OrderStatusService extends BaseService<OrderStatusEntity> {
  constructor(
    @InjectRepository(OrderStatusEntity)
    private readonly _OrderStatusRepository: Repository<OrderStatusEntity>
  ) {
    super(_OrderStatusRepository);
  }
}