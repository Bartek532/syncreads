import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { serverSchema, validateConfig } from "@rssmarkable/shared";

import { DeviceModule } from "./device/device.module";
import { ParserModule } from "./parser/parser.module";
import { SupabaseModule } from "./supabase/supabase.module";
import { SyncModule } from "./sync/sync.module";

import type { ServerConfig } from "@rssmarkable/shared";

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: (config: ConfigService<ServerConfig, true>) => {
        return {
          redis: {
            host: config.get<string>("REDIS_HOST"),
            port: config.get<number>("REDIS_PORT"),
            password: config.get<string>("REDIS_PASSWORD"),
            username: "default",
            family: 6,
            reconnectOnError: (err) => {
              console.log(err);
              return true;
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      cache: true,
      envFilePath: [".env"],
      isGlobal: true,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      validate: (config) => {
        console.log(config);
        return validateConfig(serverSchema, config);
      },
    }),
    SupabaseModule,
    DeviceModule,
    ParserModule,
    SyncModule,
  ],
})
export class AppModule {}
