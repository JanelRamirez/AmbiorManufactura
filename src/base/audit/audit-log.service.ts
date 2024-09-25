import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuditLog } from "./audit-log.toEntity";
import { Repository } from "typeorm";

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  async logChange(entityName: string, entityId: number, oldValues: any, newValues: any, actionType: string) {
    const auditLog = new AuditLog();
    auditLog.entityName = entityName;
    auditLog.entityId = entityId;
    auditLog.oldValues = oldValues;
    auditLog.newValues = newValues;
    auditLog.actionType = actionType;
    auditLog.timestamp = new Date();

    await this.auditLogRepository.save(auditLog);
  }
}
