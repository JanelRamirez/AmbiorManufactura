import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configurations } from './config.register';
import { ConfigOption } from './interfaces/config-option.interface';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/.env.${
        process.env.NODE_ENV || 'local'
      }`,
      load: [...configurations],
      isGlobal: true,
    }),
  ],
  exports: [],
  providers: [],
})
export class AppConfigModule {
  static forRoot(options: ConfigOption): DynamicModule {
    return {
      module: AppConfigModule,
      imports: [
        ConfigModule.forRoot({
          envFilePath: `${process.cwd()}/env/.env.${
            process.env.NODE_ENV || 'local'
          }`,
          load: [...configurations, ...options.appModuleConfig],
          isGlobal: true,
        }),
      ],
    };
  }
}
