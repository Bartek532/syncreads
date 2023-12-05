import type { Entry, MetadataEntry } from "rmapi-js";

export interface DeviceStrategy {
  syncEntry: (userId: string, entry: Entry) => Promise<void>;
  upsertFolder: (userId: string, name: string) => Promise<MetadataEntry>;
  upload: ({
    userId,
    title,
    folder,
    pdf,
  }: {
    userId: string;
    title: string;
    folder?: string;
    pdf: Buffer;
  }) => Promise<Entry>;
}
