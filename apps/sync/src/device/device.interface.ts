import type { CollectionMetadataEntry, MetadataEntry } from "rmapi-js";

export interface DeviceStrategy {
  upload: ({
    userId,
    title,
    folderId,
    pdf,
  }: {
    userId: string;
    title: string;
    pdf: Buffer;
    folderId?: string;
  }) => Promise<void>;
  getFolder?: (
    userId: string,
    name: string,
  ) => Promise<MetadataEntry | undefined>;
  createFolder?: (
    userId: string,
    name: string,
  ) => Promise<CollectionMetadataEntry>;
}
