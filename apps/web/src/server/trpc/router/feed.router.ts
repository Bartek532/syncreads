import { router, protectedProcedure } from "..";
import {
  createFeedSchema,
  getWebsiteDetailsSchema,
} from "../../../utils/validation/schema";
import {
  createFeedHandler,
  getFeedDetailsHandler,
} from "../../controllers/feed.controller";

export const feedRouter = router({
  createFeed: protectedProcedure
    .input(createFeedSchema)
    .mutation(({ input, ctx }) =>
      createFeedHandler({ ...input, id: ctx.session.user.id }),
    ),
  // importFeeds: protectedProcedure
  //   .input(importFeedsSchema)
  //   .mutation(({ input, ctx }) =>
  //     importFeedsHandler({ ...input, id: ctx.session.user.id }),
  //   ),
  getFeedDetails: protectedProcedure
    .input(getWebsiteDetailsSchema)
    .query(({ input }) => getFeedDetailsHandler(input)),
});
