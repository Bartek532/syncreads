import { memo } from "react";

import { ArticleTile } from "./tile/article-tile";

import type { Article } from "@rssmarkable/database";

type ArticlesListProps = {
  readonly articles: Article[];
};

export const ArticlesList = memo<ArticlesListProps>(({ articles }) => {
  return (
    <div className="w-full flex-1 rounded-lg bg-background p-6 shadow-sm">
      <ol className="flex flex-col gap-6">
        {articles.slice(0, 5).map((article) => (
          <li key={article.syncId}>
            <ArticleTile url={article.url} />
          </li>
        ))}
      </ol>
    </div>
  );
});

ArticlesList.displayName = "ArticlesList";
