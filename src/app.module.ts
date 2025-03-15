import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule } from './core/app-config/app-config.module';
import { TranslationModule } from './core/translation/translation.module';
import { MailPoolModule } from './core/mail-pool/mail-pool.module';
import { SharedModule } from './core/shared/shared.module';
import { AuthModule } from './core/auth/auth.module';
import { LANGUAGES } from './core/translation/constants/languages.const';
import { DatabaseModule } from './core/database/database.module';
import { RestClientModule } from './core/rest-client/rest-client.module';

import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './auth-permission/config/guards/jwt-auth.guard';
import { RolesGuard } from './auth-permission/config/guards/role.guard';
import { PermissionService } from './auth-permission/services/permission.service';
import { AuthPermissionModule } from './auth-permission/auth-permission.module';
import { AuditModule } from './base/audit/audit-log.module';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:admin123@localhost:27017/ambiorDB?authSource=admin'),
    DatabaseModule.forRoot({
      autoRegisterModels: true,
    }),
    TranslationModule.forRoot(
      process.env.APP_DEFAULT_LOCALE || LANGUAGES.ENGLISH,
    ),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'SA',
      password: 'Janel@1234',
      database: 'Ambior_Manufactura_SRL',
      entities: ['dist/**/*.toEntity.js'],
      synchronize: true,//Ambiente de desarrollo
      options: { encrypt: false },
      autoLoadEntities: true,
    }),
    AuthPermissionModule,
    SharedModule.forRoot(),
    RestClientModule,
    AppConfigModule,
    MailPoolModule,
    AuthModule,
    AuditModule,
    UserModule,
  ],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: JwtAuthGuard,
  //   },
  //   {
  //     provide: APP_GUARD,
  //     useClass: RolesGuard,
  //   },
  //   PermissionService
  // ],
})
export class AppModule {}
