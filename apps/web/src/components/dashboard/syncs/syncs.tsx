"use client";

import { memo } from "react";

import EmptySyncsIcon from "public/svg/empty-syncs.svg";

import { columns } from "./table/columns";
import { SyncsTable } from "./table/table";

import type { Sync } from "@rssmarkable/database";

type SyncsProps = {
  readonly syncs: Sync[];
};

export const Syncs = memo<SyncsProps>(({ syncs }) => {
  if (syncs.length) {
    return (
      <div className="mt-4">
        <SyncsTable data={syncs} columns={columns} />
      </div>
    );
  }

  return (
    <button className="relative mt-6 flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 p-16 py-20 text-center transition-colors hover:border-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:py-24">
      <EmptySyncsIcon className="h-50 mx-auto w-40 text-muted-foreground" />
      <span className="mt-8 block text-lg font-medium">
        You haven&apos;t synced any content yet!
      </span>
    </button>
  );
});

Syncs.displayName = "Syncs";
