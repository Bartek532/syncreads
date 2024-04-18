import { createTRPCRouter, protectedProcedure } from "..";
import {
  createFeedSchema,
  getUrlDetailsSchema,
  importFeedsSchema,
} from "../../../utils/validation/schema";
import {
  createFeedHandler,
  getUrlDetailsHandler,
  importFeedsHandler,
} from "../../controllers/feed.controller";

export const feedRouter = createTRPCRouter({
  createFeed: protectedProcedure
    .input(createFeedSchema)
    .mutation(({ input, ctx }) =>
      createFeedHandler({
        ...input,
        id: ctx.session.user.id,
        url: input.url,
      }),
    ),
  importFeeds: protectedProcedure
    .input(importFeedsSchema)
    .mutation(({ input, ctx }) =>
      importFeedsHandler({ ...input, id: ctx.session.user.id }),
    ),
  getUrlDetails: protectedProcedure
    .input(getUrlDetailsSchema)
    .query(({ input }) => getUrlDetailsHandler({ ...input, url: input.url })),
});
