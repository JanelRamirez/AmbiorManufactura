import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditLog } from './audit-log.toEntity';
import { Repository } from 'typeorm';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  async logChange(log: AuditLog) {
    const { filteredOldValues, filteredNewValues } = this.getChangedValues(
      log.oldValues,
      log.newValues,
    );
    log.oldValues = JSON.stringify(filteredOldValues);
    log.newValues = JSON.stringify(filteredNewValues);
    log.timestamp = new Date();
    await this.auditLogRepository.save(log);
  }

  private getChangedValues(oldValues: any, newValues: any) {
    const filteredOldValues: any = {};
    const filteredNewValues: any = {};

    for (const key in newValues) {
      if (newValues.hasOwnProperty(key)) {
        if (oldValues[key] !== newValues[key]) {
          filteredOldValues[key] = oldValues[key];
          filteredNewValues[key] = newValues[key];
        }
      }
    }
    return { filteredOldValues, filteredNewValues };
  }
}
