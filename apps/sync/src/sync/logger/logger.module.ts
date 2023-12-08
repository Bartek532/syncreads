import { Module } from "@nestjs/common";

import { SupabaseModule } from "../../supabase/supabase.module";

import { syncLoggerProvider } from "./logger.provider";
import { LoggerService } from "./logger.service";

@Module({
  imports: [SupabaseModule],
  providers: [syncLoggerProvider, LoggerService],
  exports: [syncLoggerProvider, LoggerService],
})
export class SyncLoggerModule {}
