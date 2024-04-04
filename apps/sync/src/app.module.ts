import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { serverSchema, validateConfig } from "@syncreads/shared";

import { DeviceModule } from "./device/device.module";
import { EmailModule } from "./email/email.module";
import { GeneratorModule } from "./generator/generator.module";
import { ParserModule } from "./parser/parser.module";
import { SupabaseModule } from "./supabase/supabase.module";
import { SyncModule } from "./sync/sync.module";

import type { ServerConfig } from "@syncreads/shared";

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: (config: ConfigService<ServerConfig, true>) => {
        return {
          redis: {
            host: config.get<string>("REDIS_HOST"),
            port: config.get<number>("REDIS_PORT"),
            password: config.get<string>("REDIS_PASSWORD"),
            family: 6,
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
      validate: (config) => validateConfig(serverSchema, config),
    }),
    SupabaseModule,
    DeviceModule,
    ParserModule,
    GeneratorModule,
    SyncModule,
    EmailModule,
  ],
})
export class AppModule {}
