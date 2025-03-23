import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './service/invoice.service';
import { InvoiceEntity } from './entity/invoice.toEntity';
import { InvoiceMapper } from './invoice.mapper';
import { InvoiceValidator } from './invoice.validator';
import { AuthPermissionModule } from 'src/auth-permission/auth-permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceEntity]), AuthPermissionModule],
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceMapper, InvoiceValidator],
})
export class InvoiceModule {}
