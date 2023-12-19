"use client";

import { memo, useState } from "react";

import { AddFeedDialog } from "./dialog/add-feed-dialog";
import { FeedsList } from "./list/feeds-list";

import { Button } from "@/components/ui/button";

export const Feeds = memo(() => {
  const [checkedFeeds, setCheckedFeeds] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState(false);

  const handleToggleFeed = (id: string, state: boolean) => {
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
      <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row">
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

      <FeedsList
        onToggle={handleToggleFeed}
        checkedFeeds={checkedFeeds}
        onCreateNew={() => setOpen(true)}
      />
      <AddFeedDialog open={open} onOpenChange={(o) => setOpen(o)} />
    </div>
  );
});

Feeds.displayName = "Feeds";
