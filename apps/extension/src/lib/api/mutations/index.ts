import { syncArticle } from "./sync";

export enum MUTATIONS {
  SYNC_ARTICLE = "sync-article",
}

export const mutations = {
  [MUTATIONS.SYNC_ARTICLE]: syncArticle,
};
