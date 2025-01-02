import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { CarEntity } from "../entity/car.toEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CarService extends BaseService<CarEntity> {
  constructor(
    @InjectRepository(CarEntity)
    private readonly _CarRepository: Repository<CarEntity>
  ) {
    super(_CarRepository);
  }
}