import { Loader2 } from "lucide-react";
import { memo } from "react";

import { cn, onPromise } from "@/utils";

import EmptyFeedsIcon from "public/svg/empty-feeds.svg";

import { api } from "../../../../trpc/react";
import { Button } from "../../../ui/button";
import { Checkbox } from "../../../ui/checkbox";
import { Empty } from "../../../ui/empty";
import { Skeleton } from "../../../ui/skeleton";

import { FeedTile, FeedTileSkeleton } from "./tile/feed-tile";

import type { Feed } from "@rssmarkable/database";

const FeedsListSkeleton = () => (
  <div className="mt-6 flex flex-col gap-5">
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
    const { isLoading, isFetchingNextPage, data, fetchNextPage } =
      api.user.getUserFeeds.useInfiniteQuery(
        {},
        {
          getNextPageParam: (lastPage) => lastPage.data.at(-1)?.createdAt,
        },
      );

    if (isLoading) {
      return <FeedsListSkeleton />;
    }

    if (!data?.pages[0]?.data.length) {
      return (
        <Empty
          onCreateNew={onCreateNew}
          icon={<EmptyFeedsIcon />}
          title="You haven't added any feed yet!"
          className="mt-6"
        />
      );
    }

    const feeds = data.pages.map(({ data }) => data).flat();
    const total = data.pages[0]?.count ?? 0;

    return (
      <>
        <ul className="mt-6 flex flex-col gap-5">
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
            {isFetchingNextPage ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Load more"
            )}
          </Button>
        )}
      </>
    );
  },
);

FeedsList.displayName = "FeedsList";
