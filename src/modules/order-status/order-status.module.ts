import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatusController } from './order-status.controller';
import { OrderStatusService } from './service/order-status.service';
import { OrderStatusEntity } from './entity/order-status.toEntity';
import { OrderStatusMapper } from './order-status.mapper';
import { OrderStatusValidator } from './order-status.validator';
import { AuthPermissionModule } from 'src/auth-permission/auth-permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatusEntity]), AuthPermissionModule],
  controllers: [OrderStatusController],
  providers: [OrderStatusService, OrderStatusMapper, OrderStatusValidator],
})
export class OrderStatusModule {}
