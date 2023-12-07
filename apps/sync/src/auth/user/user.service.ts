import { Inject, NotFoundException } from "@nestjs/common";
import { DEFAULT_USER_METADATA, isUserMetadata } from "@rssmarkable/shared";

import { SUPABASE_CLIENT_FACTORY_TOKEN } from "../../supabase/supabase.constants";
import { SupabaseProviderFactory } from "../../supabase/supabase.provider";

import type { UpdateUserFeed } from "@rssmarkable/database";

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

    return {
      ...data.user,
      user_metadata: isUserMetadata(data.user.user_metadata)
        ? data.user.user_metadata
        : DEFAULT_USER_METADATA,
    };
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

  async getUserFeed(userId: string, feedId: string) {
    const { data, error } = await this.supabaseProvider()
      .from("UserFeed")
      .select("*, Feed (id, url)")
      .eq("userId", userId)
      .eq("feedId", feedId)
      .single();

    if (error) {
      throw error;
    }

    const Feed = data.Feed;

    if (!Feed) {
      throw new NotFoundException(`Feed with id ${feedId} not found!`);
    }

    return { ...data, Feed };
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

  async updateUserFeed(userId: string, feedId: string, data: UpdateUserFeed) {
    return this.supabaseProvider()
      .from("UserFeed")
      .update(data)
      .eq("userId", userId)
      .eq("feedId", feedId)
      .throwOnError();
  }
}
