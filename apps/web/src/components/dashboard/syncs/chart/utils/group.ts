import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import type { Range } from "@/utils";

import type { Sync } from "@syncreads/database";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const groupSyncsByDay = (range: Range, syncs: Sync[]) => {
  return range.days.map((day) => {
    const syncsOnDay = syncs.filter(
      (sync) =>
        dayjs(sync.startedAt).isSameOrAfter(dayjs(day).startOf("day")) &&
        dayjs(sync.startedAt).isSameOrBefore(dayjs(day).endOf("day")),
    );

    return {
      day,
      syncs: syncsOnDay,
    };
  });
};
