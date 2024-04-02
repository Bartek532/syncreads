"use client";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Loader } from "lucide-react";
import { memo, useEffect, useState } from "react";

import { useRealtimeSyncs } from "@/hooks/useRealtime";
import { cn } from "@/utils";

import type { Sync } from "@syncreads/database";

dayjs.extend(duration);

type RealtimeSyncDurationProps = {
  readonly sync: Sync;
  readonly className?: string;
};

const getDifference = (startedAt: string, finishedAt: string | null) => {
  const start = startedAt;
  const end = finishedAt ?? new Date();
  return dayjs.duration(dayjs(end).diff(dayjs(start)));
};

export const RealtimeSyncDuration = memo<RealtimeSyncDurationProps>(
  ({ sync: initialSync, className }) => {
    const realtimeSyncs = useRealtimeSyncs();
    const sync = {
      ...initialSync,
      ...realtimeSyncs.find((s) => s.id === initialSync.id),
    };
    const [difference, setDifference] = useState<duration.Duration | null>(
      getDifference(sync.startedAt, sync.finishedAt),
    );

    useEffect(() => {
      const interval = setInterval(() => {
        setDifference(getDifference(sync.startedAt, sync.finishedAt));
      }, 1000);

      if (sync.finishedAt) {
        setDifference(getDifference(sync.startedAt, sync.finishedAt));
        clearInterval(interval);
      }

      return () => {
        clearInterval(interval);
      };
    }, [sync.startedAt, sync.finishedAt]);

    const format =
      difference && difference.asSeconds() < 1 ? "SSS[ms]" : "H[h] m[m] s[s]";

    return (
      <span
        className={cn(
          "flex w-full items-center gap-2 pr-4 text-right",
          className,
        )}
      >
        {!sync.finishedAt && (
          <Loader className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
        )}
        {difference && difference.format(format).replace(/\b0+[a-z]+\s*/gi, "")}
      </span>
    );
  },
);

RealtimeSyncDuration.displayName = "RealtimeSyncDuration";
