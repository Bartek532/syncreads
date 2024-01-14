import { HTTP_STATUS_CODE } from "@rssmarkable/shared";
import dayjs from "dayjs";

import type { LimitInput, RangeInput, UpdateUserInput } from "@/utils";

import { supabase } from "../../lib/supabase/server";
import { ApiError } from "../utils/exceptions";

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
    .select("*, Feed (id, url)", { count: "exact" })
    .lt("createdAt", [cursor])
    .order("createdAt", { ascending: false })
    .eq("userId", id)
    .limit(limit);
};

export const getUserDevice = ({ id }: { id: string }) => {
  return supabase().from("Device").select("*").eq("userId", id).single();
};

export const getUserFeedByUrl = ({ id, url }: { id: string; url: string }) => {
  return supabase()
    .from("UserFeed")
    .select("*, feed:Feed!inner (url)")
    .eq("userId", id)
    .eq("feed.url", url)
    .single();
};

export const getUserApiKey = ({ id }: { id: string }) => {
  return supabase().from("ApiKey").select("key").eq("userId", id).single();
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
    .select("*, articles:Article(url)")
    .eq("userId", id)
    .order("startedAt", { ascending: false });

  if (from && to) {
    void query
      .gte("startedAt", dayjs(from).toISOString())
      .lte("startedAt", dayjs(to).toISOString());
  }

  return query;
};

export const getUserArticles = ({ id, limit }: LimitInput & { id: string }) => {
  return supabase()
    .from("Article")
    .select("*, sync:Sync(userId,startedAt)")
    .eq("sync.userId", id)
    .order("startedAt", { referencedTable: "Sync", ascending: false })
    .limit(limit);
};

export const registerUserDevice = ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  return supabase()
    .from("Device")
    .insert({ userId: id, token })
    .single()
    .throwOnError();
};

export const unregisterUserDevice = ({ id }: { id: string }) => {
  return supabase()
    .from("Device")
    .delete()
    .eq("userId", id)
    .single()
    .throwOnError();
};
