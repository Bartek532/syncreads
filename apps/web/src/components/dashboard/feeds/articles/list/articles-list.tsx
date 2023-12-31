import { memo } from "react";

import type { Article } from "@rssmarkable/database";

type ArticlesListProps = {
  readonly articles: Article[];
};

export const ArticlesList = memo<ArticlesListProps>(({ articles }) => {
  return (
    <div className="w-full flex-1 rounded-lg bg-background p-6 shadow-sm">
      <ol>
        {articles.map((article) => (
          <li key={article.syncId}>
            <p>{article.url}</p>
          </li>
        ))}
      </ol>
    </div>
  );
});

ArticlesList.displayName = "ArticlesList";
