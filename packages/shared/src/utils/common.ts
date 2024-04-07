import { DEFAULT_OPTIONS } from "../constants";

import type { SyncOptionsInput, UserMetadata } from "../validation";

export const clearUrl = (url: string) => {
  const parsed = new URL(url);
  parsed.search = "";
  parsed.hash = "";
  return parsed.toString().trim();
};

export const removeProtocolsFromUrl = (url: string) =>
  url.replace(/^(https?:\/\/)?(www\.)?/, "");

export const getSyncDefaultOptions = (
  metadata: Partial<UserMetadata>,
): SyncOptionsInput => {
  return {
    format: metadata.format ?? DEFAULT_OPTIONS.format,
    ...(metadata.folder && !metadata.folder.root
      ? {
          folder: metadata.folder.name,
        }
      : {}),
  };
};
