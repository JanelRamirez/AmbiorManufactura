import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { InvoiceEntity } from "../entity/invoice.toEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class InvoiceService extends BaseService<InvoiceEntity> {
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly _InvoiceRepository: Repository<InvoiceEntity>
  ) {
    super(_InvoiceRepository);
  }
}