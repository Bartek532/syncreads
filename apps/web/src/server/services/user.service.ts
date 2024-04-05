import { HTTP_STATUS_CODE, ApiError } from "@syncreads/shared";
import dayjs from "dayjs";

import type { LimitInput, RangeInput, UpdateUserInput } from "@/utils";

import { supabase } from "../../lib/supabase/server";

import type { DeviceType } from "@syncreads/database";

export const updateUser = async (input: UpdateUserInput) => {
  const { data, error } = await supabase().auth.getUser();

  if (error) {
    throw new ApiError(
      error.status ?? HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      error.message,
    );
  }
  return supabase().auth.updateUser({
    data: {
      ...data.user.user_metadata,
      ...input,
    },
  });
};

export const getUserFeeds = ({
  id,
  limit,
  cursor,
}: {
  id: string;
  limit: number;
  cursor: string;
}) => {
  return supabase()
    .from("UserFeed")
    .select("*, Feed (id, url, site)", { count: "exact" })
    .lt("createdAt", [cursor])
    .order("createdAt", { ascending: false })
    .eq("userId", id)
    .limit(limit);
};

export const getUserDevice = ({ id }: { id: string }) => {
  return supabase()
    .from("UserDevice")
    .select("*")
    .eq("userId", id)
    .maybeSingle();
};

export const getUserFeedByUrl = ({ id, url }: { id: string; url: string }) => {
  return supabase()
    .from("UserFeed")
    .select("*, feed:Feed!inner (url)")
    .eq("userId", id)
    .eq("feed.url", url)
    .maybeSingle();
};

export const getUserApiKey = ({ id }: { id: string }) => {
  return supabase().from("UserApiKey").select("key").eq("userId", id).single();
};

export const deleteUserFeed = ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  return supabase().from("UserFeed").delete().match({ feedId: id, userId });
};

export const getUserSyncs = ({ id, from, to }: RangeInput & { id: string }) => {
  const query = supabase()
    .from("Sync")
    .select("*, articles:SyncArticle(url)")
    .eq("userId", id)
    .order("startedAt", { ascending: false });

  if (from && to) {
    void query
      .gte("startedAt", dayjs(from).toISOString())
      .lte("startedAt", dayjs(to).toISOString());
  }

  return query;
};

export const getUserSyncsCount = ({ id }: { id: string }) => {
  return supabase()
    .from("Sync")
    .select("*", { count: "exact" })
    .eq("userId", id);
};

export const getUserArticles = ({ id, limit }: LimitInput & { id: string }) => {
  return supabase()
    .from("SyncArticle")
    .select("*, sync:Sync(userId)")
    .eq("sync.userId", id)
    .order("syncedAt", { ascending: false })
    .limit(limit);
};

export const getUserArticlesCount = ({ id }: { id: string }) => {
  return supabase()
    .from("SyncArticle")
    .select("*, sync:Sync(userId)", { count: "exact" })
    .eq("sync.userId", id);
};

export const registerUserDevice = ({
  id,
  token,
  type,
}: {
  id: string;
  token: string;
  type: DeviceType;
}) => {
  return supabase()
    .from("UserDevice")
    .insert({ userId: id, token, type })
    .single()
    .throwOnError();
};

export const unregisterUserDevice = ({ id }: { id: string }) => {
  return supabase()
    .from("UserDevice")
    .delete()
    .eq("userId", id)
    .single()
    .throwOnError();
};
