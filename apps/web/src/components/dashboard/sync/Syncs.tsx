"use client";

import { memo } from "react";

import EmptySyncsIcon from "public/svg/empty-syncs.svg";

import { columns } from "./table/columns";
import { SyncsTable } from "./table/table";

import type { Sync } from "@rssmarkable/database";

import { Empty } from "@/components/common/Empty";

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
    <Empty onCreateNew={() => {}}>
      <EmptySyncsIcon className="h-50 mx-auto w-40 text-muted-foreground" />
      <span className="mt-8 block text-lg font-medium">
        You haven&apos;t synced any content yet!
      </span>
    </Empty>
  );
});

Syncs.displayName = "Syncs";
