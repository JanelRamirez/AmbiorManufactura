import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule } from './core/app-config/app-config.module';
import { TranslationModule } from './core/translation/translation.module';
import { MailPoolModule } from './core/mail-pool/mail-pool.module';
import { SharedModule } from './core/shared/shared.module';
import { AuthModule } from './core/auth/auth.module';
import { TestModule } from './modules/test/test.module';
import { LANGUAGES } from './core/translation/constants/languages.const';
import { DatabaseModule } from './core/database/database.module';
import { RestClientModule } from './core/rest-client/rest-client.module';
import { EmpleadoModule } from './modules/empleado/empleado.module';

import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth-permission/config/guards/jwt-auth.guard';
import { RolesGuard } from './auth-permission/config/guards/role.guard';
import { PermissionService } from './auth-permission/services/permission.service';
import { AuthJwtService } from './auth-permission/services/auth-jwt.service';

@Module({
  imports: [
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
      username: 'eduardo.mendez',
      password: 'Inicio01',
      database: 'Test1',
      entities: ['dist/**/*.toEntity.js'],
      synchronize: true,
      options: { encrypt: false },
      autoLoadEntities: true,
    }),
    JwtModule,
    /* StorageModule.forRoot({
      driver: process.env.STORAGE_DRIVER as StorageDriver,
      s3Config: {
        endPoint: process.env.S3_END_POINT,
        port: parseInt(process.env.S3_PORT, 10),
        useSSL: process.env.S3_USE_SSL === 'true',
        accessKey: process.env.S3_ACCESS_KEY,
        secretKey: process.env.S3_SECRET_KEY,
        objectLocking: process.env.S3_OBJECT_LOCKING === 'true',
        retentionPeriod: parseInt(process.env.S3_RETENTION_PERIOD, 10),
      },
    }), */
    SharedModule.forRoot(),
    RestClientModule,
    AppConfigModule,
    MailPoolModule,
    AuthModule,
    TestModule,
    EmpleadoModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    PermissionService,
    AuthJwtService
  ],
})
export class AppModule {}
