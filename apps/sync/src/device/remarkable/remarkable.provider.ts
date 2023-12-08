import { UserService } from "../../auth/user/user.service";

import { getClient } from "./api/remarkable.client";
import { RemarkableCacheService } from "./cache.service";
import { REMARKABLE_CLIENT_FACTORY_TOKEN } from "./remarkable.constants";

import type { RemarkableApi } from "rmapi-js";

export type RemarkableProviderFactory = (
  userId: string,
) => Promise<RemarkableApi>;

export const remarkableProvider = {
  provide: REMARKABLE_CLIENT_FACTORY_TOKEN,
  useFactory: (
    userService: UserService,
    cacheService: RemarkableCacheService,
  ) => {
    return async (userId: string) => {
      const { token } = await userService.getUserDevice(userId);

      if (cacheService.get(token)) {
        return cacheService.get(token);
      }

      const client = await getClient(token);
      cacheService.set(token, client);
      return client;
    };
  },
  inject: [UserService, RemarkableCacheService],
};
