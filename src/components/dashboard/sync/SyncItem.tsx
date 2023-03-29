import { ArrowPathIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import dayjs from "dayjs";
import Link from "next/link";
import { memo } from "react";

import type { Sync } from "@prisma/client";

interface SyncItemProps {
  readonly sync: Sync;
}

const statusStyles = {
  SUCCESS: "bg-green-100 text-green-800",
  PENDING: "bg-yellow-100 text-yellow-800",
  FAILED: "bg-red-100 text-red-800",
  UNKNOWN: "bg-gray-100 text-gray-800",
};

export const SyncItem = memo<SyncItemProps>(({ sync }) => {
  return (
    <tr
      key={sync.id}
      className="relative flex flex-col items-start gap-1.5 bg-white px-4 py-4 sm:table-row"
    >
      <td className="w-full whitespace-nowrap text-sm text-gray-900 sm:max-w-0 sm:px-6 sm:py-4">
        <div className="flex">
          <Link
            href={`/dashboard/syncs/${sync.id}`}
            className="group inline-flex space-x-2 truncate text-sm"
          >
            <ArrowPathIcon
              className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
            <p className="truncate text-gray-500 group-hover:text-gray-900">
              {sync.id}
            </p>
          </Link>
        </div>
      </td>
      <td className="hidden whitespace-nowrap text-right text-sm text-gray-500 sm:px-6 sm:py-4 md:table-cell">
        {sync.syncedArticlesCount}
      </td>
      <td className="ml-6 whitespace-nowrap text-sm text-gray-500 sm:ml-0 sm:px-6 sm:py-4 md:block">
        <span
          className={clsx(
            statusStyles[sync.status],
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
          )}
        >
          {sync.status.toLocaleLowerCase()}
        </span>
      </td>
      <td className="ml-7 whitespace-nowrap text-right text-sm text-gray-500 sm:px-6 sm:py-4">
        <time dateTime={sync.startedAt.toString()}>
          {dayjs(sync.startedAt).format("MMMM D, HH:mm")}
        </time>
      </td>

      <td
        className="absolute right-0 top-0 block flex h-full items-center justify-center bg-white px-4 sm:hidden"
        aria-hidden="true"
      >
        <Link href={`/dashboard/syncs/${sync.id}`}>
          <ChevronRightIcon className="h-5 w-5 text-gray-400" />
        </Link>
      </td>
    </tr>
  );
});

SyncItem.displayName = "SyncItem";
