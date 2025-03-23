import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { OrderDetailEntity } from "../entity/order-detail.toEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class OrderDetailService extends BaseService<OrderDetailEntity> {
  constructor(
    @InjectRepository(OrderDetailEntity)
    private readonly _OrderDetailRepository: Repository<OrderDetailEntity>
  ) {
    super(_OrderDetailRepository);
  }
}