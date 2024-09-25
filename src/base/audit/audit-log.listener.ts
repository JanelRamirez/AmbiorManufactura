import { EntitySubscriberInterface, EventSubscriber, InsertEvent, RemoveEvent, UpdateEvent } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AuditService } from './audit-log.service';

@EventSubscriber()
@Injectable()
export class AuditListener implements EntitySubscriberInterface {

  constructor(private readonly auditService: AuditService) {}

  async afterInsert(event: InsertEvent<any>) {
    console.log(this.auditService);
    await this.auditService.logChange(
      event.entity.constructor.name,
      event.entity.id,
      null,
      event.entity,
      'INSERT'
    );
  }

  async afterUpdate(event: UpdateEvent<any>) {
    await this.auditService.logChange(
      event.entity.constructor.name,
      event.entity.id,
      event.databaseEntity,
      event.entity,
      'UPDATE'
    );
  }

  async afterRemove(event: RemoveEvent<any>) {
    await this.auditService.logChange(
      event.entity.constructor.name,
      event.entity.id,
      event.databaseEntity,
      null,
      'DELETE'
    );
  }

  async beforeUpdate?(event: UpdateEvent<any>){
    console.log('beforeUpdate', event);
  }

  async beforeInsert(event: InsertEvent<any>){
      console.log('beforeInsert', event);
  }
}
