import type {
  createAndConnectSchema,
  createFeedSchema,
  deleteAndDisconnectFeedSchema,
  deleteFeedSchema,
  getWebsiteDetailsSchema,
  importAndConnectFeedsSchema,
  importFeedsSchema,
  loginUserSchema,
  logMessageSchema,
  offsetPaginationSchema,
  registerAndConnectDeviceSchema,
  registerDeviceSchema,
  registerUserSchema,
  syncArticleSchema,
  unregisterAndDisconnectDeviceSchema,
} from "./schema";
import type { TypeOf } from "zod";

export type RegisterUserInput = TypeOf<typeof registerUserSchema>;
export type LoginUserInput = TypeOf<typeof loginUserSchema>;
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
export type OffsetPaginationInput = TypeOf<typeof offsetPaginationSchema>;
export type LogMessage = TypeOf<typeof logMessageSchema>;
