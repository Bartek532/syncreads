"use client";

import dayjs from "dayjs";
import { marked } from "marked";
import { useParams, useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";

import { SYNC_LOG_LEVEL_COLORS } from "@/config/sync";
import { cn } from "@/utils";

import type { Log } from "@rssmarkable/database";
import type { LogMessage } from "@rssmarkable/shared";

type SyncLogProps = {
  readonly log: Log;
};

export const SyncLog = memo<SyncLogProps>(({ log }) => {
  const [activeLine, setActiveLine] = useState("");
  const router = useRouter();
  const params = useParams();

  const lines = JSON.parse(log.json?.toString() ?? "[]") as LogMessage[];

  useEffect(() => {
    const arr = window.location.hash.match(/#L\d+/g);
    if (arr) {
      setActiveLine(arr[0]);
      document.getElementById(arr[0])?.scrollIntoView();
    }
  }, [params]);

  return (
    <div className="-mx-6 overflow-hidden overflow-x-auto border bg-background py-4 shadow-sm sm:mx-0 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <tbody>
          {lines.map(({ date, message, level }, index) => (
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
                className="w-0 cursor-pointer py-1 px-4 align-top sm:py-1.5 sm:px-7"
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
                  dangerouslySetInnerHTML={{ __html: marked.parse(message) }}
                  className="markdown"
                ></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

SyncLog.displayName = "SyncLog";
