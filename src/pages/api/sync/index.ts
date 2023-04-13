import { SyncTrigger } from "@prisma/client";
import Parser from "rss-parser";

import { env } from "../../../env/server";
import { getPage } from "../../../server/services/sync.service";
import { getAllUsers } from "../../../server/services/user.service";
import { ApiError, HTTP_STATUS_CODE } from "../../../utils/exceptions";
import { nonNullable } from "../../../utils/functions";

import { syncUserFeeds } from "./feed";

import type { NextApiRequest, NextApiResponse } from "next";

const syncAll = async ({
  trigger = SyncTrigger.MANUAL,
}: {
  trigger?: SyncTrigger;
}) => {
  const parser = new Parser();
  const page = await getPage();

  const users = await getAllUsers();

  const data = await Promise.all(
    users.map(async ({ id }) => {
      try {
        const data = await syncUserFeeds({ id, parser, page, trigger });
        return data;
      } catch (e: unknown) {
        console.error(e);
        return;
      }
    }),
  );

  return {
    data,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (!(req.headers["api-key"] === env.API_KEY)) {
      throw new ApiError(HTTP_STATUS_CODE.UNAUTHORIZED, "Missing api key!");
    }

    const isScheduledSync = req.headers.trigger === SyncTrigger.SCHEDULE;

    const { data } = await syncAll({
      trigger: isScheduledSync ? SyncTrigger.SCHEDULE : SyncTrigger.MANUAL,
    });

    const syncedFeeds = data
      .filter(nonNullable)
      .map(({ feeds }) => feeds)
      .flat();
    const syncedArticles = syncedFeeds.map(({ articles }) => articles).flat();

    return res.status(200).json({
      status: "Success",
      message: `Successfully synced ${syncedFeeds.length} feed(s) - ${syncedArticles.length} article(s) for ${data.length} user(s)`,
    });
  } catch (e: unknown) {
    console.log(e);
    if (e instanceof ApiError) {
      return res.status(e.status).json({ status: "Error", message: e.message });
    }

    if (e instanceof Error) {
      return res.status(500).json({ status: "Error", message: e.message });
    }

    return res
      .status(500)
      .json({ status: "Error", message: "Internal Server Error" });
  }
}
