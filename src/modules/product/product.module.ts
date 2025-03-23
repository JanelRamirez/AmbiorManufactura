import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './service/product.service';
import { ProductEntity } from './entity/product.toEntity';
import { ProductMapper } from './product.mapper';
import { ProductValidator } from './product.validator';
import { AuthPermissionModule } from 'src/auth-permission/auth-permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), AuthPermissionModule],
  controllers: [ProductController],
  providers: [ProductService, ProductMapper, ProductValidator],
})
export class ProductModule {}
