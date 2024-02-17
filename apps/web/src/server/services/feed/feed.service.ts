import { supabase } from "../../../lib/supabase/server";
import { ApiError } from "../../utils/exceptions";

export const createUserFeed = async ({
  userId,
  feedId,
}: {
  userId: string;
  feedId: string;
}) => {
  const { error, status } = await supabase()
    .from("UserFeed")
    .upsert({ userId, feedId });

  if (error) {
    throw new ApiError(status, error.message);
  }
};

export const createFeed = async ({ url, id }: { url: string; id: string }) => {
  const { data, error, status } = await getFeedByUrl({ url });

  if (error) {
    throw new ApiError(status, error.message);
  }

  if (!data) {
    const {
      data: feedData,
      error: feedError,
      status: feedStatus,
    } = await supabase().from("Feed").insert({ url }).select().single();

    if (feedError) {
      throw new ApiError(feedStatus, feedError.message);
    }

    await createUserFeed({ userId: id, feedId: feedData.id });

    return feedData;
  }

  await createUserFeed({ userId: id, feedId: data.id });
  return data;
};

export const getFeedByUrl = ({ url }: { url: string }) => {
  return supabase().from("Feed").select("*").eq("url", url).maybeSingle();
};

export const getFeedById = ({ id }: { id: string }) => {
  return supabase()
    .from("Feed")
    .select("*, users:UserFeed(userId)")
    .eq("id", id)
    .maybeSingle();
};

export const deleteFeed = ({ id }: { id: string }) => {
  return supabase().from("Feed").delete().match({ id });
};

export { importStrategies } from "./import/import.provider";
