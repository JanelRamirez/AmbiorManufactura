import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './service/order.service';
import { OrderEntity } from './entity/order.toEntity';
import { OrderMapper } from './order.mapper';
import { OrderValidator } from './order.validator';
import { AuthPermissionModule } from 'src/auth-permission/auth-permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity]), AuthPermissionModule],
  controllers: [OrderController],
  providers: [OrderService, OrderMapper, OrderValidator],
})
export class OrderModule {}
