import { removeProtocolsFromUrl } from "@syncreads/shared";
import { ArrowUpRight } from "lucide-react";
import { memo } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/server";

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
      className="group flex w-full flex-1 items-start justify-between gap-4 sm:gap-6"
      target="_blank"
      rel="noreferrer"
    >
      <Avatar className="mt-1 h-full min-h-7 w-7 shrink-0 rounded-none sm:h-8 sm:min-h-8 sm:w-8">
        <AvatarImage src={data.icon ?? "/favicon.ico"} alt="" />
        <AvatarFallback className="h-7 rounded-full sm:h-8">
          {data.title?.[0] ?? "N/A"}
        </AvatarFallback>
      </Avatar>
      <div className="mr-auto flex shrink flex-col gap-1">
        <span className="text-sm font-bold underline group-hover:no-underline">
          {data.title ?? "N/A"}
        </span>
        <span className="break-all text-xs text-muted-foreground">
          {removeProtocolsFromUrl(url)}
        </span>
      </div>
      <ArrowUpRight className="hidden h-6 w-6 shrink-0 text-muted-foreground transition-colors group-hover:text-primary sm:block" />
    </a>
  );
});

export const ArticleTileSkeleton = () => {
  return <Skeleton className="h-16 w-full" />;
};

ArticleTile.displayName = "ArticleTile";
