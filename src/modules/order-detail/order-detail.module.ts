import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailController } from './order-detail.controller';
import { OrderDetailService } from './service/order-detail.service';
import { OrderDetailEntity } from './entity/order-detail.toEntity';
import { OrderDetailMapper } from './order-detail.mapper';
import { OrderDetailValidator } from './order-detail.validator';
import { AuthPermissionModule } from 'src/auth-permission/auth-permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetailEntity]), AuthPermissionModule],
  controllers: [OrderDetailController],
  providers: [OrderDetailService, OrderDetailMapper, OrderDetailValidator],
})
export class OrderDetailModule {}
