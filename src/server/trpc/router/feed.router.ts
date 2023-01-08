import {
  createFeedHandler,
  deleteFeedHandler,
  getAllFeedsHandler,
  getWebsiteDetailsHandler,
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
      createFeedHandler({ ...input, email: ctx.session.user.email }),
    ),
  deleteFeed: protectedProcedure
    .input(deleteFeedSchema)
    .mutation(({ input, ctx }) =>
      deleteFeedHandler({ ...input, email: ctx.session.user.email }),
    ),
  getWebsiteDetails: protectedProcedure
    .input(getWebsiteDetailsSchema)
    .query(({ input }) => getWebsiteDetailsHandler(input)),
  getAllFeeds: protectedProcedure.query(() => getAllFeedsHandler()),
});
