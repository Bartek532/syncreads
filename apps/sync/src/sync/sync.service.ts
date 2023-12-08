import { HttpException, Inject, Injectable } from "@nestjs/common";

import { SUPABASE_CLIENT_FACTORY_TOKEN } from "../supabase/supabase.constants";
import { SupabaseProviderFactory } from "../supabase/supabase.provider";

import { SYNC_LOGGER_PROVIDER_TOKEN } from "./logger/logger.constants";
import { SyncLoggerProviderFactory } from "./logger/logger.provider";

import type { InsertSync, UpdateSync } from "@rssmarkable/database";

@Injectable()
export class SyncService {
  constructor(
    @Inject(SUPABASE_CLIENT_FACTORY_TOKEN)
    private readonly supabaseProvider: SupabaseProviderFactory,
    @Inject(SYNC_LOGGER_PROVIDER_TOKEN)
    private readonly syncLogger: SyncLoggerProviderFactory,
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

    await this.syncLogger(data.id);

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
