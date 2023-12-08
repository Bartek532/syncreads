import { Injectable } from "@nestjs/common";

import type { RemarkableApi } from "rmapi-js";

type RemarkableCache = Record<string, RemarkableApi>;

@Injectable()
export class RemarkableCacheService {
  private readonly cachedRemarkableClients: RemarkableCache = {};

  get(token: string) {
    return this.cachedRemarkableClients[token];
  }

  set(token: string, client: RemarkableApi) {
    if (!this.cachedRemarkableClients[token]) {
      this.cachedRemarkableClients[token] = client;
    }
  }
}
