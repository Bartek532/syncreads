import { UserService } from "../../auth/user/user.service";

import { KINDLE_CLIENT_FACTORY_TOKEN } from "./kindle.constants";

export type KindleProviderFactory = (userId: string) => Promise<string>;

export const kindleProvider = {
  provide: KINDLE_CLIENT_FACTORY_TOKEN,
  useFactory: (userService: UserService) => {
    return async (userId: string) => {
      const { token } = await userService.getUserDevice(userId);
      return token;
    };
  },
  inject: [UserService],
};
