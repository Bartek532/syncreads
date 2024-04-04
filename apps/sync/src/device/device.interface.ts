import type { OUTPUT_FORMAT } from "@syncreads/shared";
import type { CollectionMetadataEntry, MetadataEntry } from "rmapi-js";

export interface DeviceStrategy {
  upload: (data: {
    userId: string;
    title: string;
    file: {
      content: Buffer;
      type: OUTPUT_FORMAT;
    };
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
