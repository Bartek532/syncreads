import { Inject } from "@nestjs/common";

import { SUPABASE_CLIENT_FACTORY_TOKEN } from "../../supabase/supabase.constants";
import { SupabaseProviderFactory } from "../../supabase/supabase.provider";

export class UserService {
  constructor(
    @Inject(SUPABASE_CLIENT_FACTORY_TOKEN)
    private readonly supabaseProvider: SupabaseProviderFactory,
  ) {}

  async getUserById(id: string) {
    const { data, error } =
      await this.supabaseProvider().auth.admin.getUserById(id);

    if (error) {
      throw error;
    }

    return data.user;
  }

  async getUserDevice(userId: string) {
    const { data, error } = await this.supabaseProvider()
      .from("Device")
      .select()
      .eq("userId", userId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  async getUserFeeds(userId: string, feedIds: string[]) {
    const { data, error } = await this.supabaseProvider()
      .from("UserFeed")
      .select("*, Feed (id, url)")
      .eq("userId", userId)
      .in("feedId", feedIds);

    if (error) {
      throw error;
    }

    return data;
  }
}
