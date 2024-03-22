"use client";

import { memo } from "react";

import EmptySyncsIcon from "public/svg/empty-syncs.svg";

import { useRealtimeSyncs } from "../../../hooks/useRealtime";
import { Empty } from "../../ui/empty";

import { columns } from "./table/columns";
import { SyncsTable } from "./table/table";

import type { Sync } from "@rssmarkable/database";

type SyncsProps = {
  readonly syncs: Sync[];
};

export const Syncs = memo<SyncsProps>(({ syncs }) => {
  useRealtimeSyncs(syncs.map((sync) => sync.id));

  if (syncs.length) {
    return <SyncsTable data={syncs} columns={columns} />;
  }

  return (
    <Empty
      icon={<EmptySyncsIcon />}
      title="You haven't synced any content yet!"
    />
  );
});

Syncs.displayName = "Syncs";
