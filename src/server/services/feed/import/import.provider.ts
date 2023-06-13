import { FILE_TYPE } from "../../../../../types/feed.types";

import { opmlStrategy } from "./opml/opml.strategy";

import type { ImportStrategies } from "./import.types";

export const importStrategies: ImportStrategies = {
  [FILE_TYPE.OPML]: opmlStrategy,
};
