import { DEFAULT_OPTIONS } from "./options";

export const SYNC_DEFAULT_FOLDER = "SyncReads";

export const DEFAULT_USER_METADATA = {
  name: "",
  folder: {
    name: SYNC_DEFAULT_FOLDER,
    root: true,
  },
  format: DEFAULT_OPTIONS.format,
};
