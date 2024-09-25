import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLog } from './audit-log.toEntity';
import { AuditService } from './audit-log.service';
import { AuditListener } from './audit-log.listener';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuditLog]),
  ],
  providers: [AuditService, AuditListener],
})
export class AuditModule {}
