import { clearUrl } from "@rssmarkable/shared";

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
      createFeedHandler({
        ...input,
        id: ctx.session.user.id,
        url: clearUrl(input.url),
      }),
    ),
  // importFeeds: protectedProcedure
  //   .input(importFeedsSchema)
  //   .mutation(({ input, ctx }) =>
  //     importFeedsHandler({ ...input, id: ctx.session.user.id }),
  //   ),
  getUrlDetails: protectedProcedure
    .input(getUrlDetailsSchema)
    .query(({ input }) =>
      getUrlDetailsHandler({ ...input, url: clearUrl(input.url) }),
    ),
});
