import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarController } from './car.controller';
import { CarService } from './service/car.service';
import { CarEntity } from './entity/car.toEntity';
import { CarMapper } from './car.mapper';
import { CarValidator } from './car.validator';
import { AuthPermissionModule } from 'src/auth-permission/auth-permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity]), AuthPermissionModule],
  controllers: [CarController],
  providers: [CarService, CarMapper, CarValidator],
})
export class CarModule {}
