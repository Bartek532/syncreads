import type { Entry } from "rmapi-js";

export interface DeviceStrategy {
  syncEntry: (userId: string, entry: Entry) => Promise<void>;
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
