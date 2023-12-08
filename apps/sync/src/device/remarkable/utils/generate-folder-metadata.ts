import type { CollectionTypeMetadata } from "rmapi-js";

export const generateFolderMetadata = (name: string) => {
  const lastModified = `${new Date().valueOf()}`;

  const metadata: CollectionTypeMetadata = {
    type: "CollectionType",
    visibleName: name,
    version: 0,
    parent: "",
    synced: true,
    lastModified,
  };

  return metadata;
};
