import { STORAGE_TYPE, createStorage } from "./base";

import type { BaseStorage } from "./base";
import type { Session } from "@rssmarkable/database";

type SessionStorage = BaseStorage<Session | null> & {
  setSession: (session: Session | null) => Promise<void>;
};

const storage = createStorage<Session | null>("auth-session", null, {
  storageType: STORAGE_TYPE.LOCAL,
  liveUpdate: true,
});

export const sessionStorage: SessionStorage = {
  ...storage,
  setSession: (session: Session | null) => {
    return storage.set(() => session);
  },
};
