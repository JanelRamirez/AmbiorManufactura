import { ConfigFactory } from "@nestjs/config";

export interface ConfigOption<> {
    appModuleConfig: Array<ConfigFactory>;
}