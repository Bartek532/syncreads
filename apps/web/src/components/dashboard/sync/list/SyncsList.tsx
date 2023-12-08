import { memo } from "react";

import { PAGINATION_TYPE } from "../../../../config/dashboard";

import {
  SyncsListControlsCursor,
  SyncsListControlsOffset,
} from "./controls/SyncsListControls";
import { SyncItem } from "./SyncItem";

import type { Sync } from "@rssmarkable/database";

interface SyncsListProps {
  readonly syncs: Sync[];
  readonly total: number | undefined;
  readonly paginationType?: PAGINATION_TYPE;
}

export const SyncsList = memo<SyncsListProps>(
  ({ syncs, total, paginationType = PAGINATION_TYPE.OFFSET }) => {
    return (
      <div className="flex min-w-full flex-col ">
        <div className="overflow-hidden overflow-x-auto shadow sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-800">
            <thead className="hidden sm:table-header-group">
              <tr className="bg-gray-50 text-gray-900 dark:bg-slate-800 dark:text-white">
                <th
                  className="px-6 py-3 text-left text-sm font-semibold dark:bg-slate-900/50"
                  scope="col"
                >
                  Sync uid
                </th>
                <th
                  className="whitespace-nowrap px-6 py-3 text-right text-sm font-semibold dark:bg-slate-900/50"
                  scope="col"
                >
                  Trigger
                </th>
                <th
                  className="hidden whitespace-nowrap px-6 py-3 text-right text-sm font-semibold dark:bg-slate-900/50 md:table-cell"
                  scope="col"
                >
                  Articles
                </th>
                <th
                  className=" px-6 py-3 text-left text-sm font-semibold dark:bg-slate-900/50"
                  scope="col"
                >
                  Status
                </th>
                <th
                  className="px-6 py-3 text-right text-sm font-semibold dark:bg-slate-900/50"
                  scope="col"
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:bg-slate-800">
              {syncs.map((sync) => (
                <SyncItem sync={sync} key={sync.id} />
              ))}
            </tbody>
          </table>

          {paginationType === PAGINATION_TYPE.OFFSET ? (
            <SyncsListControlsOffset total={total ?? 0} />
          ) : null}
        </div>

        {paginationType === PAGINATION_TYPE.CURSOR &&
        total &&
        total > syncs.length ? (
          <SyncsListControlsCursor />
        ) : null}
      </div>
    );
  },
);

SyncsList.displayName = "SyncsList";
