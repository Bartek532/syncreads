import { ArrowUpRightIcon } from "lucide-react";
import { memo } from "react";

import { api } from "@/trpc/react";
import { truncateTextByWordsCount } from "@/utils";

type FeedTileProps = {
  readonly url: string;
};

export const FeedTile = memo<FeedTileProps>(({ url }) => {
  const { data } = api.feed.getFeedDetails.useQuery({
    url,
  });

  if (!data) {
    return null;
  }

  return (
    <div className="group relative flex min-h-[112px] w-full items-stretch gap-1 rounded-lg bg-background shadow-sm sm:min-h-[118px] md:min-h-[140px] md:gap-3">
      <div
        className="hidden shrink-0 grow-0 basis-1/4 rounded-l-2xl bg-cover bg-center sm:block sm:basis-1/5 md:basis-1/4"
        style={{ backgroundImage: `url(${data.feed.image ?? ""})` }}
      ></div>
      <div className="p-4 pr-14 md:py-8">
        <h2 className="text-base font-medium sm:text-lg">
          <a
            href={data.feed.url}
            className="focus:outline-none"
            target="_blank"
            rel="noreferrer"
          >
            {data.feed.title}
          </a>
        </h2>
        <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
          {truncateTextByWordsCount(
            data.feed.description || "404 - description not found!",
            15,
          )}
        </p>
      </div>
      <span
        className="pointer-events-none absolute top-6 right-6 text-muted-foreground group-hover:text-primary"
        aria-hidden="true"
      >
        <ArrowUpRightIcon className="h-6 w-6" />
      </span>
    </div>
  );
});

FeedTile.displayName = "FeedTile";
