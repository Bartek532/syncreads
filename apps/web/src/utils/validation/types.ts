import type {
  createAndConnectFeedSchema,
  createFeedSchema,
  cursorPaginationSchema,
  deleteAndDisconnectFeedsSchema,
  deleteFeedsSchema,
  getUrlDetailsSchema,
  importAndConnectFeedsSchema,
  importFeedsSchema,
  rangeSchema,
  registerAndConnectDeviceSchema,
  registerDeviceSchema,
  unregisterAndDisconnectDeviceSchema,
} from "./schema";
import type { TypeOf } from "zod";

export type CreateFeedInput = TypeOf<typeof createFeedSchema>;
export type CreateAndConnectFeedInput = TypeOf<
  typeof createAndConnectFeedSchema
>;
export type ImportFeedsInput = TypeOf<typeof importFeedsSchema>;
export type ImportAndConnectFeedsInput = TypeOf<
  typeof importAndConnectFeedsSchema
>;
export type DeleteFeedsInput = TypeOf<typeof deleteFeedsSchema>;
export type DeleteAndDisconnectFeedsInput = TypeOf<
  typeof deleteAndDisconnectFeedsSchema
>;
export type GetUrlDetailsInput = TypeOf<typeof getUrlDetailsSchema>;
export type RegisterDeviceInput = TypeOf<typeof registerDeviceSchema>;
export type RegisterAndConnectDeviceInput = TypeOf<
  typeof registerAndConnectDeviceSchema
>;
export type UnregisterAndDisconnectDeviceInput = TypeOf<
  typeof unregisterAndDisconnectDeviceSchema
>;
export type CursorPaginationInput = TypeOf<typeof cursorPaginationSchema>;
export type RangeInput = TypeOf<typeof rangeSchema>;
