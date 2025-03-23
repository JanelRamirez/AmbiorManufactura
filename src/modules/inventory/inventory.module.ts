import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './service/inventory.service';
import { InventoryEntity } from './entity/inventory.toEntity';
import { InventoryMapper } from './inventory.mapper';
import { InventoryValidator } from './inventory.validator';
import { AuthPermissionModule } from 'src/auth-permission/auth-permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryEntity]), AuthPermissionModule],
  controllers: [InventoryController],
  providers: [InventoryService, InventoryMapper, InventoryValidator],
})
export class InventoryModule {}
