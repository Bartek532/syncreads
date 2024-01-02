import { router, protectedProcedure } from "..";
import {
  createFeedSchema,
  getUrlDetailsSchema,
} from "../../../utils/validation/schema";
import {
  createFeedHandler,
  getUrlDetailsHandler,
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
  getUrlDetails: protectedProcedure
    .input(getUrlDetailsSchema)
    .query(({ input }) => getUrlDetailsHandler(input)),
});
