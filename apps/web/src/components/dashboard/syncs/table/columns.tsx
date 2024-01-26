"use client";

import { type Sync } from "@rssmarkable/database";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { RefreshCw } from "lucide-react";
import Link from "next/link";

import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { SYNC_STATUS_COLORS, SYNC_TRIGGER_EMOJIS } from "@/config/sync";
import { capitalize, cn } from "@/utils";

import type { SyncTrigger, SyncStatus } from "@rssmarkable/database";
import type { ColumnDef } from "@tanstack/react-table";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const columns: ColumnDef<Sync>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sync" className="w-full" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center  gap-2 truncate">
        <RefreshCw className="h-4 w-4 text-muted-foreground" />
        <Link
          href={`/dashboard/syncs/${row.original.id}`}
          className="truncate text-muted-foreground transition-colors hover:text-primary"
        >
          {row.getValue("id")}
        </Link>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "duration",
    accessorFn: ({ startedAt, finishedAt }) =>
      finishedAt ? dayjs(finishedAt).diff(dayjs(startedAt)) : 0,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Duration"
        className="justify-end"
      />
    ),
    cell: ({ row }) => {
      const finishedAt = row.original.finishedAt;
      const startedAt = row.original.startedAt;
      const difference = dayjs.duration(
        dayjs(finishedAt).diff(dayjs(startedAt)),
      );
      const format = difference.asSeconds() < 1 ? "SSS[ms]" : "H[h] m[m] s[s]";

      return (
        <span className="block w-full pr-4 text-right">
          {finishedAt
            ? difference.format(format).replace(/\b0+[a-z]+\s*/gi, "")
            : "-"}
        </span>
      );
    },
  },
  {
    accessorKey: "trigger",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Trigger"
        className="justify-end"
      />
    ),
    cell: ({ row }) => {
      const trigger = row.getValue<SyncTrigger>("trigger");
      return (
        <span className="block w-full pr-2 text-right">
          {SYNC_TRIGGER_EMOJIS[trigger]}
        </span>
      );
    },
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue<SyncStatus>("status");

      return (
        <div className="'px-2 flex items-center gap-2">
          <div
            className={cn("h-3 w-3 rounded-full", SYNC_STATUS_COLORS[status])}
          ></div>
          <span className="whitespace-nowrap">
            {capitalize(status.toLocaleLowerCase().replace("_", " "))}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "date",
    accessorKey: "startedAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Date"
        className="justify-end "
      />
    ),
    cell: ({ row }) => {
      return (
        <time
          dateTime={row.getValue("date")}
          className="block w-full whitespace-nowrap pr-2 text-right"
        >
          {dayjs(row.getValue("date")).format("MMMM D, HH:mm")}
        </time>
      );
    },
  },
];
