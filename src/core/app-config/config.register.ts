import { registerAs } from '@nestjs/config';
import { ConfigKey } from './enums/config-key.enum';
import { Environment } from './enums/env.enum';
import { IDatabaseConfig } from './interfaces/database.interface';
import { IAppConfig } from './interfaces/app-config.interface';
import { StorageDriver } from '../storage/types/storage-driver.enum';
import { IS3Config } from './interfaces/s3-config.interface';
import { IAuthConfig } from './interfaces/auth-config.interface';
import { IMailConfiguration } from './interfaces/mail-config.interface';

const APPConfig = registerAs<IAppConfig>(ConfigKey.App, () => {
  return {
    appEnv:
      Environment[process.env.NODE_ENV as keyof typeof Environment] ||
      Environment.Local,
    appName: process.env.APP_NAME,
    appDescription: process.env.APP_DESCRIPTION,
    appVersion: process.env.APP_VERSION,
    appUrl: process.env.APP_URL,
    appDefaultLocale: process.env.APP_DEFAULT_LOCALE,
    storageDriver: (process.env.STORAGE_DRIVER || 'local') as StorageDriver,
  };
});

const DBConfig = registerAs<IDatabaseConfig>(ConfigKey.Db, () => ({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  hasAuthentication: process.env.DATABASE_HAS_AUTHENTICATION === 'true',
  authDataBase: process.env.DATABASE_AUTH_DATABASE,
}));

const S3Config = registerAs<IS3Config>(ConfigKey.S3, () => ({
  endPoint: process.env.S3_END_POINT,
  port: Number(process.env.S3_PORT),
  useSSL: process.env.S3_USE_SSL === 'true',
  accessKey: process.env.S3_ACCESS_KEY,
  secretKey: process.env.S3_SECRET_KEY,
  objectLocking: process.env.S3_OBJECT_LOCKING === 'true',
  retentionPeriod: Number(process.env.S3_RETENTION_PERIOD),
}));

const AuthConfig = registerAs<IAuthConfig>(ConfigKey.Auth, () => ({
  secret: process.env.JWT_SECRET,
url: process.env.AUTHORIZATION_SERVER_URL,
appId: +process.env.APP_ID

}));

const MailConfig = registerAs<IMailConfiguration>(ConfigKey.Mail, () => ({
  mail_action: process.env.MAIL_CENTER_ACTION_URL,
  mail_url: process.env.MAIL_CENTER_URL,
  mail_key: process.env.MAIL_CENTER_APP_KEY,
  mail_secret: process.env.MAIL_CENTER_SECRET_KEY
}));

export const configurations = [APPConfig, DBConfig, S3Config, AuthConfig, MailConfig];
