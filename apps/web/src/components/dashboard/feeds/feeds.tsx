"use client";

import { memo, useState } from "react";

import EmptyFeedsIcon from "public/svg/empty-feeds.svg";

import { AddFeedDialog } from "./dialog/add-feed-dialog";
import { FeedTile } from "./tile/feed-tile";

import type { Feed, UserFeed } from "@rssmarkable/database";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type FeedsProps = {
  readonly feeds: (UserFeed & { Feed: Feed })[];
};

export const Feeds = memo<FeedsProps>(({ feeds: initialFeeds }) => {
  const [feeds, setFeeds] = useState(initialFeeds);
  const [checkedFeeds, setCheckedFeeds] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState(false);

  const handleCheckFeed = (id: string, state: boolean) => {
    setCheckedFeeds((prev) => {
      const next = new Set(prev);
      if (state) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div className="flex flex-col justify-start space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">All feeds</h1>
          <p className="text-sm text-muted-foreground">
            One place to rule them all, sync something new!
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {checkedFeeds.size > 0 && (
            <>
              <Button variant="destructive">
                Delete {checkedFeeds.size} feed{checkedFeeds.size > 1 && "s"}
              </Button>
              <Button>
                Sync {checkedFeeds.size} feed{checkedFeeds.size > 1 && "s"}
              </Button>
            </>
          )}
          <Button variant="outline" onClick={() => setOpen(true)}>
            Add feed
          </Button>
        </div>
      </div>

      {feeds.length ? (
        <ul className="mt-4 flex flex-col gap-5">
          {feeds.map((feed) => (
            <li key={feed.feedId}>
              <label className="flex items-center gap-4 md:gap-6">
                <Checkbox
                  className="h-5 w-5"
                  onCheckedChange={(c) => handleCheckFeed(feed.feedId, !!c)}
                />
                <FeedTile url={feed.Feed.url} />
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="relative mt-6 flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 p-16 py-20 text-center transition-colors hover:border-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:py-24"
        >
          <EmptyFeedsIcon className="h-50 mx-auto w-40 text-muted-foreground" />
          <span className="mt-8 block text-lg font-medium">
            You haven&apos;t added any feed yet!
          </span>
        </button>
      )}
      <AddFeedDialog open={open} onOpenChange={(o) => setOpen(o)} />
    </div>
  );
});

Feeds.displayName = "Feeds";
