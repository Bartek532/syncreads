"use client";

import { type Log } from "@rssmarkable/database";
import dayjs from "dayjs";
import { marked } from "marked";
import { useParams, useRouter } from "next/navigation";
import { memo, useEffect, useRef, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { SYNC_LOG_LEVEL_COLORS } from "@/config/sync";
import { useRealtimeLog, useRealtimeSyncs } from "@/hooks/useRealtime";
import { cn } from "@/utils";

import type { Sync } from "@rssmarkable/database";
import type { LogMessage } from "@rssmarkable/shared";

type SyncLogProps = {
  readonly log: Log & { json: LogMessage[] };
  readonly sync: Sync;
};

export const SyncLog = memo<SyncLogProps>(
  ({ log: initialLog, sync: initialSync }) => {
    const [activeLine, setActiveLine] = useState("");
    const linesTableRef = useRef<HTMLTableElement>(null);
    const router = useRouter();
    const params = useParams();
    const realtimeSyncs = useRealtimeSyncs();
    const realtimeLog = useRealtimeLog({
      syncId: initialSync.id,
      onPayload: () => linesTableRef.current?.scrollIntoView(false),
    });

    const log = {
      ...initialLog,
      ...realtimeLog,
    };

    const sync = {
      ...initialSync,
      ...realtimeSyncs.find((s) => s.id === initialSync.id),
    };

    useEffect(() => {
      const arr = window.location.hash.match(/#L\d+/g);
      if (arr) {
        setActiveLine(arr[0]);
        document.getElementById(arr[0])?.scrollIntoView();
      }
    }, [params]);

    return (
      <div className="-mx-6 -mb-16 pb-16 sm:mx-0" ref={linesTableRef}>
        <div className="w-full overflow-hidden overflow-x-auto border bg-background py-4 shadow-sm sm:rounded-lg">
          <table className="min-w-full">
            <tbody>
              {log.json.map(({ date, message, level }, index) => (
                <tr
                  key={date.toString()}
                  className={cn(
                    "text-sm sm:text-base",
                    SYNC_LOG_LEVEL_COLORS[level],
                    activeLine === `#L${index + 1}` &&
                      "bg-picked text-picked-foreground hover:bg-picked/60",
                  )}
                >
                  <td
                    className="w-0 cursor-pointer px-4 py-1 align-top sm:px-7 sm:py-1.5"
                    aria-hidden="true"
                    onClick={() => router.push(`#L${index + 1}`)}
                  >
                    <span className="hidden sm:inline">
                      {dayjs(date).format("HH:mm:ss.SSS")}
                    </span>
                    <span className="inline sm:hidden">
                      {dayjs(date).format("HH:mm:ss")}
                    </span>
                  </td>
                  <td className="py-1 pr-4 sm:py-1.5 sm:pr-6">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(message),
                      }}
                      className="markdown"
                    ></span>
                  </td>
                </tr>
              ))}

              {!sync.finishedAt && (
                <tr>
                  <td className="px-4 pt-1.5 sm:px-7 sm:pt-2">
                    <Skeleton className="h-5 w-full bg-muted-foreground/30" />
                  </td>
                  <td>
                    <div className="mt-2 flex w-full justify-start gap-2">
                      <span className="sr-only">Loading...</span>
                      <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-muted-foreground/30 [animation-delay:-0.3s]"></div>
                      <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-muted-foreground/30 [animation-delay:-0.15s]"></div>
                      <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-muted-foreground/30"></div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
);

SyncLog.displayName = "SyncLog";
