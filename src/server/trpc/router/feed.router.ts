import {
  createFeedHandler,
  deleteFeedHandler,
  getAllFeedsHandler,
  getFeedDetailsHandler,
} from "../../../server/controllers/feed.controller";
import {
  createFeedSchema,
  deleteFeedSchema,
  getWebsiteDetailsSchema,
} from "../../../utils/validation";
import { router, protectedProcedure } from "../trpc";

export const feedRouter = router({
  createFeed: protectedProcedure
    .input(createFeedSchema)
    .mutation(({ input, ctx }) =>
      createFeedHandler({ ...input, id: ctx.session.user.id }),
    ),
  deleteFeed: protectedProcedure
    .input(deleteFeedSchema)
    .mutation(({ input, ctx }) =>
      deleteFeedHandler({ ...input, id: ctx.session.user.id }),
    ),
  getFeedDetails: protectedProcedure
    .input(getWebsiteDetailsSchema)
    .query(({ input }) => getFeedDetailsHandler(input)),
  getAllFeeds: protectedProcedure.query(() => getAllFeedsHandler()),
});
