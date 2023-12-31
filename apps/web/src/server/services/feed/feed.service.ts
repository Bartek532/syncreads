import { supabase } from "../../../lib/supabase/server";
import { ApiError } from "../../utils/exceptions";

export const createFeed = async ({ url, id }: { url: string; id: string }) => {
  const { data, error, status } = await supabase()
    .from("Feed")
    .insert({ url })
    .select()
    .single();

  if (error) {
    throw new ApiError(status, error.message);
  }

  const { error: userFeedError, status: userFeedStatus } = await supabase()
    .from("UserFeed")
    .insert({ userId: id, feedId: data.id });

  if (userFeedError) {
    throw new ApiError(userFeedStatus, userFeedError.message);
  }

  return data;
};

export const getFeedByUrl = ({ url }: { url: string }) => {
  return supabase().from("Feed").select("*").eq("url", url).single();
};

export const getFeedById = ({ id }: { id: string }) => {
  return supabase()
    .from("Feed")
    .select("*, users:UserFeed(userId)")
    .eq("id", id)
    .single();
};

export const getAllFeeds = () => {
  return supabase().from("Feed").select("*");
};

export const deleteFeed = ({ id }: { id: string }) => {
  return supabase().from("Feed").delete().match({ id });
};

export { importStrategies } from "./import/import.provider";
