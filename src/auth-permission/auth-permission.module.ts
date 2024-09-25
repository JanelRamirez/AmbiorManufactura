// auth-shared.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthJwtService } from 'src/auth-permission/services/auth-jwt.service';

@Module({
  imports: [
    JwtModule
  ],
  providers: [AuthJwtService],
  exports: [JwtModule, AuthJwtService]
})
export class AuthPermissionModule {}