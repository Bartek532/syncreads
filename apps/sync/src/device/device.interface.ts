import type { Entry, MetadataEntry } from "rmapi-js";

export interface DeviceStrategy {
  syncEntry: (userId: string, entry: Entry) => Promise<void>;
  upsertFolder: (userId: string, name: string) => Promise<MetadataEntry>;
}
