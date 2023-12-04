import { z } from "zod";

import { NODE_ENV, nodeEnvs } from "../constants";

export const ConfigurationSchema = z.object({
  // General variables
  NODE_ENV: nodeEnvs.default(NODE_ENV.DEVELOPMENT).optional(),

  // Path to Chrome executable
  CHROME_BIN: z.string(),
});
