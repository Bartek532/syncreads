import {
  HttpException,
  Inject,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import {
  DEFAULT_USER_METADATA,
  HTTP_STATUS_CODE,
  isUserMetadata,
} from "@rssmarkable/shared";

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

  async getUserByApiKey(apiKey: string) {
    const { data, error, status } = await this.supabaseProvider()
      .from("ApiKey")
      .select("*")
      .eq("key", apiKey)
      .single();

    if (status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
      throw new UnauthorizedException(
        "Request is missing an API key or supplied key is invalid.",
      );
    }

    if (error) {
      throw new HttpException(error.details, status);
    }

    return data;
  }

  async getUserDevice(userId: string) {
    const { data, error, status } = await this.supabaseProvider()
      .from("Device")
      .select()
      .eq("userId", userId)
      .single();

    if (status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
      throw new NotFoundException("Device not found!");
    }

    if (error) {
      throw new HttpException(error.details, status);
    }

    return data;
  }

  async getUserFeed(userId: string, feedId: string) {
    const { data, error, status } = await this.supabaseProvider()
      .from("UserFeed")
      .select("*, feed:Feed (id, url)")
      .eq("userId", userId)
      .eq("feedId", feedId)
      .single();

    if (error) {
      throw new HttpException(error.details, status);
    }

    const feed = data.feed;

    if (!feed) {
      throw new NotFoundException(`Feed with id ${feedId} not found!`);
    }

    return { ...data, feed };
  }

  async getUserFeeds(userId: string, feedIds: string[]) {
    const { data, error, status } = await this.supabaseProvider()
      .from("UserFeed")
      .select("*, Feed (id, url)")
      .eq("userId", userId)
      .in("feedId", feedIds);

    if (error) {
      throw new HttpException(error.details, status);
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
