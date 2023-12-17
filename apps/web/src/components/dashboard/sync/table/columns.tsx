"use client";

import { SyncStatus, type Sync } from "@rssmarkable/database";
import dayjs from "dayjs";
import { RefreshCw } from "lucide-react";
import Link from "next/link";

import type { SyncTrigger } from "@rssmarkable/database";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { SYNC_TRIGGER_EMOJIS } from "@/config/sync";
import { cn } from "@/utils";

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
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          // href={`/dashboard/syncs/${row.getValue("id")}`}
          href="/"
          className="truncate text-muted-foreground hover:text-primary"
        >
          {row.getValue("id")}
        </Link>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
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
  },
  {
    accessorKey: "syncedArticlesCount",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Articles"
        className="justify-end"
      />
    ),
    cell: ({ row }) => {
      return (
        <span className="block w-full pr-4 text-right">
          {row.getValue("syncedArticlesCount")}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const colors = {
        [SyncStatus.FAILED]: "bg-destructive",
        [SyncStatus.SUCCESS]: "bg-green-500",
        [SyncStatus.IN_PROGRESS]: "bg-yellow-500",
        [SyncStatus.QUEUED]: "bg-blue-500",
        [SyncStatus.UNKNOWN]: "bg-muted-foreground",
      };

      const status = row.getValue<SyncStatus>("status");

      return (
        <div className="'px-2 flex items-center gap-2">
          <div className={cn("h-3 w-3 rounded-full", colors[status])}></div>
          <span className="whitespace-nowrap capitalize">
            {status.toLocaleLowerCase().replace("_", " ")}
          </span>
        </div>
      );
    },
  },
  {
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
          dateTime={row.getValue("startedAt")}
          className="block w-full whitespace-nowrap pr-2 text-right"
        >
          {dayjs(row.getValue("startedAt")).format("MMMM D, HH:mm")}
        </time>
      );
    },
  },
  //   {
  //     accessorKey: "status",
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="Status" />
  //     ),
  //     cell: ({ row }) => {
  //       const status = statuses.find(
  //         (status) => status.value === row.getValue("status"),
  //       );

  //       if (!status) {
  //         return null;
  //       }

  //       return (
  //         <div className="flex w-[100px] items-center">
  //           {status.icon && (
  //             <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //           )}
  //           <span>{status.label}</span>
  //         </div>
  //       );
  //     },
  //     filterFn: (row, id, value) => {
  //       return value.includes(row.getValue(id));
  //     },
  //   },
  //   {
  //     accessorKey: "priority",
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="Priority" />
  //     ),
  //     cell: ({ row }) => {
  //       const priority = priorities.find(
  //         (priority) => priority.value === row.getValue("priority"),
  //       );

  //       if (!priority) {
  //         return null;
  //       }

  //       return (
  //         <div className="flex items-center">
  //           {priority.icon && (
  //             <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //           )}
  //           <span>{priority.label}</span>
  //         </div>
  //       );
  //     },
  //     filterFn: (row, id, value) => {
  //       return value.includes(row.getValue(id));
  //     },
  //   },
  //   {
  //     id: "actions",
  //     cell: ({ row }) => <DataTableRowActions row={row} />,
  //   },
];
