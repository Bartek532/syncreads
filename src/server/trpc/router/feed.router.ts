import {
  createFeedHandler,
  deleteFeedHandler,
  getAllFeedsHandler,
} from "src/server/controllers/feed.controller";
import { createFeedSchema, deleteFeedSchema } from "src/utils/validation";

import { router, protectedProcedure } from "../trpc";

export const feedRouter = router({
  createFeed: protectedProcedure
    .input(createFeedSchema)
    .mutation(({ input, ctx }) =>
      createFeedHandler({ ...input, email: ctx.session.user.email }),
    ),
  deleteFeed: protectedProcedure
    .input(deleteFeedSchema)
    .mutation(({ input, ctx }) =>
      deleteFeedHandler({ ...input, email: ctx.session.user.email }),
    ),
  getAllFeeds: protectedProcedure.query(() => getAllFeedsHandler()),
});
