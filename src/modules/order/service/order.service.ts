import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { OrderEntity } from "../entity/order.toEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class OrderService extends BaseService<OrderEntity> {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly _OrderRepository: Repository<OrderEntity>
  ) {
    super(_OrderRepository);
  }
}