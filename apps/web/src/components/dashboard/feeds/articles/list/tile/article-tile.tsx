import { ArrowUpRight } from "lucide-react";
import { memo } from "react";

import { api } from "../../../../../../trpc/server";
import { removeProtocolsFromUrl } from "../../../../../../utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../ui/avatar";

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
      <Avatar className="mt-1 h-8 w-8 shrink-0">
        <AvatarImage src={data.icon} alt="" />
        <AvatarFallback>{data.title[0]}</AvatarFallback>
      </Avatar>
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
