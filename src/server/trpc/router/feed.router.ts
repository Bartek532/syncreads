import {
  createFeedHandler,
  deleteFeedHandler,
  getAllFeedsHandler,
} from "src/server/controllers/feed.controller";
import { createFeedSchema, params } from "src/utils/validation";

import { router, publicProcedure } from "../trpc";

export const feedRouter = router({
  createFeed: publicProcedure
    .input(createFeedSchema)
    .mutation(({ input }) => createFeedHandler({ input })),
  deleteFeed: publicProcedure
    .input(params)
    .query(({ input }) => deleteFeedHandler({ params: input })),
  getAllFeeds: publicProcedure.query(() => getAllFeedsHandler()),
});
