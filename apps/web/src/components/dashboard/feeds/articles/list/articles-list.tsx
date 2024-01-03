import { memo } from "react";

import EmptyFeedsIcon from "public/svg/empty-feeds.svg";

import { Empty } from "../../../../ui/empty";
import { SyncArticleDialog } from "../dialog/sync-article-dialog";

import { ArticleTile } from "./tile/article-tile";

import type { Article } from "@rssmarkable/database";

type ArticlesListProps = {
  readonly articles: Article[];
};

export const ArticlesList = memo<ArticlesListProps>(({ articles }) => {
  if (!articles.length) {
    return (
      <SyncArticleDialog>
        <Empty
          icon={<EmptyFeedsIcon />}
          title="Nothing here - for what are you waiting?"
        />
      </SyncArticleDialog>
    );
  }

  return (
    <div className="w-full flex-1 rounded-lg bg-background p-6 shadow-sm">
      <ol className="flex flex-col gap-6">
        {articles.map((article) => (
          <li key={article.syncId}>
            <ArticleTile url={article.url} />
          </li>
        ))}
      </ol>
    </div>
  );
});

ArticlesList.displayName = "ArticlesList";
