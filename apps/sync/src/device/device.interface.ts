import type { CollectionMetadataEntry, Entry, MetadataEntry } from "rmapi-js";

export interface DeviceStrategy {
  syncEntry: (userId: string, entry: Entry) => Promise<void>;
  upload: ({
    userId,
    title,
    folderId,
    pdf,
  }: {
    userId: string;
    title: string;
    folderId?: string;
    pdf: Buffer;
  }) => Promise<Entry>;
  getFolder: (
    userId: string,
    name: string,
  ) => Promise<MetadataEntry | undefined>;
  createFolder: (
    userId: string,
    name: string,
  ) => Promise<CollectionMetadataEntry>;
}
