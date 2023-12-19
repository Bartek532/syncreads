import type {
  createAndConnectSchema,
  createFeedSchema,
  cursorPaginationSchema,
  deleteAndDisconnectFeedSchema,
  deleteFeedSchema,
  getWebsiteDetailsSchema,
  importAndConnectFeedsSchema,
  importFeedsSchema,
  registerAndConnectDeviceSchema,
  registerDeviceSchema,
  syncArticleSchema,
  unregisterAndDisconnectDeviceSchema,
} from "./schema";
import type { TypeOf } from "zod";

export type CreateFeedInput = TypeOf<typeof createFeedSchema>;
export type CreateAndConnectFeedInput = TypeOf<typeof createAndConnectSchema>;
export type ImportFeedsInput = TypeOf<typeof importFeedsSchema>;
export type ImportAndConnectFeedsInput = TypeOf<
  typeof importAndConnectFeedsSchema
>;
export type DeleteFeedInput = TypeOf<typeof deleteFeedSchema>;
export type DeleteAndDisconnectFeedInput = TypeOf<
  typeof deleteAndDisconnectFeedSchema
>;
export type GetWebsiteDetailsInput = TypeOf<typeof getWebsiteDetailsSchema>;
export type SyncArticleInput = TypeOf<typeof syncArticleSchema>;
export type RegisterDeviceInput = TypeOf<typeof registerDeviceSchema>;
export type RegisterAndConnectDeviceInput = TypeOf<
  typeof registerAndConnectDeviceSchema
>;
export type UnregisterAndDisconnectDeviceInput = TypeOf<
  typeof unregisterAndDisconnectDeviceSchema
>;
export type CursorPaginationInput = TypeOf<typeof cursorPaginationSchema>;
