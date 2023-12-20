"use client";

import { memo, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";

import { onPromise } from "../../../utils";

import { queueFeedSync } from "./dialog/actions/actions";
import { AddFeedDialog } from "./dialog/add-feed-dialog";
import { DeleteFeedDialog } from "./dialog/delete-feed-dialog";
import { FeedsList } from "./list/feeds-list";

import type { Feed } from "@rssmarkable/database";

export const Feeds = memo(() => {
  const [checkedFeeds, setCheckedFeeds] = useState<Map<string, string>>(
    new Map(),
  );
  const [open, setOpen] = useState(false);

  const handleToggleFeed = (feed: Feed, state: boolean) => {
    setCheckedFeeds((prev) => {
      const next = new Map(prev);
      if (state) {
        next.set(feed.id, feed.url);
      } else {
        next.delete(feed.id);
      }
      return next;
    });
  };

  const onSync = async () => {
    await toast.promise(
      queueFeedSync({ in: Array.from(checkedFeeds.keys()) }),
      {
        loading: "Queuing feed sync...",
        success: ({ message }) => message,
        error: (err: Error) => err.message,
      },
    );
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
              <DeleteFeedDialog feeds={checkedFeeds}>
                <Button variant="destructive">
                  Delete {checkedFeeds.size} feed{checkedFeeds.size > 1 && "s"}
                </Button>
              </DeleteFeedDialog>
              <Button onClick={onPromise(onSync)}>
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
