"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import type { Range } from "@/utils";

import EmptySyncsIcon from "public/svg/empty-syncs.svg";

import { Empty } from "../../../ui/empty";

import { groupSyncsByDay } from "./utils/group";

import type { Sync } from "@rssmarkable/database";

type SyncsPerDayProps = {
  readonly range: Range;
  readonly syncs: Sync[];
};

export const SyncsPerDay = memo<SyncsPerDayProps>(({ range, syncs }) => {
  const router = useRouter();

  if (!syncs.length) {
    return (
      <Empty
        onCreateNew={() => router.push("/dashboard/syncs")}
        icon={<EmptySyncsIcon />}
        title="Do you want to see some stats? Sync something!"
      />
    );
  }

  const syncsByDay = groupSyncsByDay(range, syncs);
  return (
    <div className="h-96 rounded-lg bg-background p-2 pr-4 pt-6 shadow-sm md:flex-1">
      <ResponsiveContainer width="100%">
        <BarChart
          data={syncsByDay.map(({ day, syncs }) => ({
            name: dayjs(day).format("ddd"),
            total: syncs.length,
          }))}
        >
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
            width={30}
          />

          <Bar
            dataKey="total"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

SyncsPerDay.displayName = "SyncsPerDay";
