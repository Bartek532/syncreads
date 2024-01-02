"use client";

import dayjs from "dayjs";
import { memo } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import type { Range } from "@/utils";

import { groupSyncsByDay } from "./utils/group";

import type { Sync } from "@rssmarkable/database";

type SyncsPerDayProps = {
  readonly range: Range;
  readonly syncs: Sync[];
};

export const SyncsPerDay = memo<SyncsPerDayProps>(({ range, syncs }) => {
  const syncsByDay = groupSyncsByDay(range, syncs);
  return (
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
  );
});

SyncsPerDay.displayName = "SyncsPerDay";
