import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { serverSchema, validateConfig } from "@rssmarkable/shared";

import { ParserModule } from "./parser/parser.module";
import { DeviceRemarkableModule } from "./remarkable/remarkable.module";
import { SupabaseModule } from "./supabase/supabase.module";
import { SyncModule } from "./sync/sync.module";

@Module({
  imports: [
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
    DeviceRemarkableModule,
    ParserModule,
    SyncModule,
  ],
})
export class AppModule {}
