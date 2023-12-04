import { Inject, Injectable } from "@nestjs/common";

import { SUPABASE_CLIENT_FACTORY_TOKEN } from "../supabase/supabase.constants";
import { SupabaseProviderFactory } from "../supabase/supabase.provider";

import type { Sync } from "@rssmarkable/database";

@Injectable()
export class SyncService {
  constructor(
    @Inject(SUPABASE_CLIENT_FACTORY_TOKEN)
    private readonly supabaseProvider: SupabaseProviderFactory,
  ) {}

  updateFeedSyncDate({
    userId,
    feedId,
    date,
  }: {
    userId: string;
    feedId: string;
    date: Date;
  }) {
    return this.supabaseProvider()
      .from("UserFeed")
      .update({ lastSyncDate: date })
      .match({ userId, feedId })
      .throwOnError();
  }

  updateSync({ id, data }: { id: string; data: Partial<Sync> }) {
    return this.supabaseProvider()
      .from("Sync")
      .update(data)
      .match({ id })
      .throwOnError();
  }
}
