"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";

import { onPromise } from "../../../utils";

import { queueFeedSync } from "./articles/actions";
import { AddFeedDialog } from "./dialog/add-feed-dialog";
import { DeleteFeedDialog } from "./dialog/delete-feed-dialog";
import { FeedsList } from "./list/feeds-list";

import type { Feed } from "@syncreads/database";

export const Feeds = memo(() => {
  const router = useRouter();
  const [syncing, setSyncing] = useState(false);
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
    setSyncing(true);
    const loadingToast = toast.loading("Queuing feed sync...");
    const { message, success, sync } = await queueFeedSync({
      in: Array.from(checkedFeeds.keys()),
    });

    if (success) {
      toast.success(message, { id: loadingToast });
      router.push(`/dashboard/syncs/${sync.id}`);
    } else {
      toast.error(message, { id: loadingToast });
    }
    setSyncing(false);
  };

  return (
    <div className="flex flex-col gap-14">
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
              <DeleteFeedDialog feeds={checkedFeeds}>
                <Button variant="destructive">
                  Delete {checkedFeeds.size} feed{checkedFeeds.size > 1 && "s"}
                </Button>
              </DeleteFeedDialog>
              <Button onClick={onPromise(onSync)} disabled={syncing}>
                {syncing ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  `Sync ${checkedFeeds.size} feed${
                    checkedFeeds.size > 1 ? "s" : ""
                  }`
                )}
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
