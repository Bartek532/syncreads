import dayjs from "dayjs";

import type { LimitInput, RangeInput } from "@/utils";

import { supabase } from "../../lib/supabase/server";

// export const getAllUsers = () => {
//   return prisma.user.findMany();
// };

// export const createUser = ({
//   email,
//   password,
//   name,
// }: {
//   email: string;
//   password: string;
//   name: string;
// }) => {
//   return prisma.user.create({ data: { email, password, name } });
// };

// export const getUserByEmail = ({ email }: { email: string }) => {
//   return prisma.user.findUnique({
//     where: { email },
//     include: { device: true, feeds: true },
//   });
// };

// export const getUserById = ({ id }: { id: string }) => {
// };

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
