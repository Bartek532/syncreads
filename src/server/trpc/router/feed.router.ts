import { router, protectedProcedure } from "..";
import {
  createFeedHandler,
  importFeedsHandler,
  deleteFeedHandler,
  getFeedDetailsHandler,
  syncArticleHandler,
  getAllFeedsHandler,
} from "../../../server/controllers/feed.controller";
import {
  createFeedSchema,
  deleteFeedSchema,
  getWebsiteDetailsSchema,
  importFeedsSchema,
  syncArticleSchema,
} from "../../../utils/validation/schema";

export const feedRouter = router({
  createFeed: protectedProcedure
    .input(createFeedSchema)
    .mutation(({ input, ctx }) =>
      createFeedHandler({ ...input, id: ctx.session.user.id }),
    ),
  importFeeds: protectedProcedure
    .input(importFeedsSchema)
    .mutation(({ input, ctx }) =>
      importFeedsHandler({ ...input, id: ctx.session.user.id }),
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
  syncArticle: protectedProcedure
    .input(syncArticleSchema)
    .mutation(({ input, ctx }) =>
      syncArticleHandler({ id: ctx.session.user.id, ...input }),
    ),
});
