import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionController } from './production.controller';
import { ProductionService } from './service/production.service';
import { ProductionEntity } from './entity/production.toEntity';
import { ProductionMapper } from './production.mapper';
import { ProductionValidator } from './production.validator';
import { AuthPermissionModule } from 'src/auth-permission/auth-permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductionEntity]), AuthPermissionModule],
  controllers: [ProductionController],
  providers: [ProductionService, ProductionMapper, ProductionValidator],
})
export class ProductionModule {}
