import type { Entry, Metadata } from "rmapi-js";

export interface DeviceStrategy {
  syncEntry: (userId: string, entry: Entry) => Promise<void>;
  upsertFolder: (userId: string, name: string) => Promise<any>;

  getFiles: (userId: string) => Promise<Metadata[]>;
}
