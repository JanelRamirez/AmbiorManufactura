import { DataSource, EntitySubscriberInterface, EventSubscriber, UpdateEvent } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AuditService } from './audit-log.service';
import { AuditLog } from './audit-log.toEntity';

@EventSubscriber()
@Injectable()
export class AuditListener implements EntitySubscriberInterface {

  constructor(private dataSource: DataSource, private readonly auditService: AuditService) {
    dataSource.subscribers.push(this);
  }

  async afterUpdate(event: UpdateEvent<any>) {
    const log: AuditLog = {
      entityName: event.entity.constructor.name,
      entityId: event.entity.id,
      actionType: 'UPDATE',
      oldValues: event.databaseEntity,
      newValues: event.entity
    }
    await this.auditService.logChange(log);
  }
}
