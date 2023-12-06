import { Inject, Injectable } from "@nestjs/common";

import { SUPABASE_CLIENT_FACTORY_TOKEN } from "../supabase/supabase.constants";
import { SupabaseProviderFactory } from "../supabase/supabase.provider";

import type { InsertSync, UpdateSync } from "@rssmarkable/database";

@Injectable()
export class SyncService {
  constructor(
    @Inject(SUPABASE_CLIENT_FACTORY_TOKEN)
    private readonly supabaseProvider: SupabaseProviderFactory,
  ) {}

  async createSync(payload: InsertSync) {
    const { data, error } = await this.supabaseProvider()
      .from("Sync")
      .insert(payload)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  updateFeedSyncDate({
    userId,
    feedId,
    date,
  }: {
    userId: string;
    feedId: string;
    date: string;
  }) {
    return this.supabaseProvider()
      .from("UserFeed")
      .update({ lastSyncDate: date })
      .match({ userId, feedId })
      .throwOnError();
  }

  updateSync(id: string, data: UpdateSync) {
    return this.supabaseProvider()
      .from("Sync")
      .update(data)
      .match({ id })
      .throwOnError();
  }
}
