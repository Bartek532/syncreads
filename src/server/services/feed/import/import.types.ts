import type { FILE_TYPE } from "../../../../../types/feed.types";

export interface ImportStrategy {
  readonly parse: (content: string) => string[];
}

export type ImportStrategies = Record<FILE_TYPE, ImportStrategy>;
