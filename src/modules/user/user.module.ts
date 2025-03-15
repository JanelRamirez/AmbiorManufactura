import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './service/user.service';
import { UserEntity } from './entity/user.toEntity';
import { UserMapper } from './user.mapper';
import { UserValidator } from './user.validator';
import { AuthPermissionModule } from 'src/auth-permission/auth-permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthPermissionModule],
  controllers: [UserController],
  providers: [UserService, UserMapper, UserValidator],
  exports: [UserService, UserMapper]
})
export class UserModule {}
