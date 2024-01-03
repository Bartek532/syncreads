import { ArrowUpRight } from "lucide-react";
import { memo } from "react";

import { api } from "../../../../../../trpc/server";
import { removeProtocolsFromUrl } from "../../../../../../utils";

type ArticleTileProps = {
  readonly url: string;
};

export const ArticleTile = memo<ArticleTileProps>(async ({ url }) => {
  const { data } = await api.feed.getUrlDetails.query({
    url,
  });

  return (
    <a
      href={url}
      className="group flex w-full flex-1 items-start justify-between gap-6"
      target="_blank"
      rel="noreferrer"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.icon}
        alt=""
        width={30}
        height={30}
        className="mt-1 shrink-0"
      />
      <div className="mr-auto flex flex-col gap-1">
        <span className="text-sm font-bold underline group-hover:no-underline">
          {data.title}
        </span>
        <span className="text-xs text-muted-foreground">
          {removeProtocolsFromUrl(url)}
        </span>
      </div>
      <ArrowUpRight className="h-6 w-6 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
    </a>
  );
});

ArticleTile.displayName = "ArticleTile";
