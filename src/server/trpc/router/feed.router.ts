import {
  createFeedHandler,
  deleteFeedHandler,
  getAllFeedsHandler,
} from "src/server/controllers/feed.controller";
import { createAndConnectFeedSchema, params } from "src/utils/validation";

import { router, protectedProcedure } from "../trpc";

export const feedRouter = router({
  createFeed: protectedProcedure
    .input(createAndConnectFeedSchema)
    .mutation(({ input }) => createFeedHandler({ input })),
  deleteFeed: protectedProcedure
    .input(params)
    .query(({ input }) => deleteFeedHandler({ params: input })),
  getAllFeeds: protectedProcedure.query(() => getAllFeedsHandler()),
});
