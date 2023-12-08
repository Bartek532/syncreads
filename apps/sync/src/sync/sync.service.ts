import { HttpException, Inject, Injectable } from "@nestjs/common";

import { SUPABASE_CLIENT_FACTORY_TOKEN } from "../supabase/supabase.constants";
import { SupabaseProviderFactory } from "../supabase/supabase.provider";

import { SYNC_QUEUED_LOG } from "./logger/logger.constants";
import { LoggerService } from "./logger/logger.service";

import type { InsertSync, UpdateSync } from "@rssmarkable/database";

@Injectable()
export class SyncService {
  constructor(
    @Inject(SUPABASE_CLIENT_FACTORY_TOKEN)
    private readonly supabaseProvider: SupabaseProviderFactory,
    private readonly syncLoggerService: LoggerService,
  ) {}

  async createSync(payload: InsertSync) {
    const { data, error, status } = await this.supabaseProvider()
      .from("Sync")
      .insert(payload)
      .select()
      .single();

    if (error) {
      throw new HttpException(error.details, status);
    }

    await this.syncLoggerService.createLog(data.id, [SYNC_QUEUED_LOG()]);

    return data;
  }

  updateSync(id: string, data: UpdateSync) {
    return this.supabaseProvider()
      .from("Sync")
      .update(data)
      .match({ id })
      .throwOnError();
  }
}
