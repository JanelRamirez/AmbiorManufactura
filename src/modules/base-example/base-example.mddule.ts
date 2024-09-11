import { Module } from '@nestjs/common';
import { CategoryController } from './base-example.controller';
import { CategoryService } from './service/base-example.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/base-example.toEntity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
