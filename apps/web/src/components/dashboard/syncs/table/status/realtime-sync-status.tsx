"use client";

import { memo } from "react";

import { SYNC_STATUS_COLORS } from "@/config/sync";
import { useRealtimeSyncs } from "@/hooks/useRealtime";
import { capitalize, cn } from "@/utils";

import type { Sync } from "@syncreads/database";

type RealtimeSyncStatusProps = {
  readonly sync: Sync;
};

export const RealtimeSyncStatus = memo<RealtimeSyncStatusProps>(
  ({ sync: initialSync }) => {
    const realtimeSyncs = useRealtimeSyncs();
    const sync = {
      ...initialSync,
      ...realtimeSyncs.find((s) => s.id === initialSync.id),
    };

    return (
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "h-3 w-3 rounded-full",
            SYNC_STATUS_COLORS[sync.status],
          )}
        ></div>
        <span className="whitespace-nowrap">
          {capitalize(sync.status.toLocaleLowerCase().replace("_", " "))}
        </span>
      </div>
    );
  },
);

RealtimeSyncStatus.displayName = "RealtimeSyncStatus";
