import { Loader2 } from "lucide-react";
import { memo } from "react";

import { cn, onPromise } from "@/utils";

import EmptyFeedsIcon from "public/svg/empty-feeds.svg";

import { api } from "../../../../trpc/react";
import { Button } from "../../../ui/button";
import { Checkbox } from "../../../ui/checkbox";
import { Skeleton } from "../../../ui/skeleton";

import { FeedTile, FeedTileSkeleton } from "./tile/feed-tile";

import type { Feed } from "@rssmarkable/database";


const EmptyFeedsList = ({ onCreateNew }: { onCreateNew: () => void }) => {
  return (
    <button
      onClick={onCreateNew}
      className="relative mt-6 flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 p-16 py-20 text-center transition-colors hover:border-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:py-24"
    >
      <EmptyFeedsIcon className="h-50 mx-auto w-40 text-muted-foreground" />
      <span className="mt-8 block text-lg font-medium">
        You haven&apos;t added any feed yet!
      </span>
    </button>
  );
};

const FeedsListSkeleton = () => (
  <div className="flex flex-col gap-5">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex items-center gap-4 md:gap-6">
        <Skeleton className="h-5 w-5 bg-background" />
        <FeedTileSkeleton />
      </div>
    ))}
  </div>
);

type FeedsListProps = {
  readonly checkedFeeds: Map<string, string>;
  readonly onToggle: (feed: Feed, state: boolean) => void;
  readonly onCreateNew: () => void;
};

export const FeedsList = memo<FeedsListProps>(
  ({ checkedFeeds, onToggle, onCreateNew }) => {
    const { isLoading, data, fetchNextPage } =
      api.user.getUserFeeds.useInfiniteQuery(
        {},
        {
          getNextPageParam: (lastPage) => lastPage.data.at(-1)?.createdAt,
        },
      );

    if (isLoading) {
      return <FeedsListSkeleton />;
    }

    if (!data) {
      return <EmptyFeedsList onCreateNew={onCreateNew} />;
    }

    const feeds = data.pages.map(({ data }) => data).flat();
    const total = data.pages[0]?.count ?? 0;

    return (
      <>
        <ul className="flex flex-col gap-5">
          {feeds.map((feed) => (
            <li key={feed.feedId}>
              <label className="flex items-center gap-4 md:gap-6">
                <Checkbox
                  className="h-5 w-5"
                  onCheckedChange={(c) => feed.Feed && onToggle(feed.Feed, !!c)}
                />

                <FeedTile
                  url={feed.Feed?.url ?? ""}
                  className={cn(
                    checkedFeeds.has(feed.feedId) &&
                      "ring-2 ring-primary ring-offset-2",
                  )}
                />
              </label>
            </li>
          ))}
        </ul>
        {total > feeds.length && (
          <Button
            className="mx-auto w-fit"
            onClick={onPromise(() => fetchNextPage())}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Load more"}
          </Button>
        )}
      </>
    );
  },
);

FeedsList.displayName = "FeedsList";
