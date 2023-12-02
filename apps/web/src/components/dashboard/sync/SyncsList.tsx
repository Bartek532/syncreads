import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { memo } from "react";

import { PAGINATION_TYPE } from "../../../config/dashboard";
import { Button } from "../../common/Button";

import { SyncItem } from "./SyncItem";

import type { Sync } from "@rssmarkable/database";

interface SyncsListProps {
  readonly syncs: Sync[];
  readonly total: number | undefined;
  readonly page: number;
  readonly perPage: number;
  readonly onPageChange: (page: number) => void;
  readonly paginationType?: PAGINATION_TYPE;
}

export const SyncsList = memo<SyncsListProps>(
  ({
    syncs,
    total,
    page,
    perPage,
    onPageChange,
    paginationType = PAGINATION_TYPE.OFFSET,
  }) => {
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
            <nav
              className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 dark:border-slate-900 dark:bg-slate-800 sm:px-6"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                <p className="text-sm text-gray-700 dark:text-gray-500">
                  Showing{" "}
                  <span className="font-medium">
                    {(page - 1) * perPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {total && total < perPage * page ? total : perPage * page}
                  </span>{" "}
                  of <span className="font-medium">{total ?? 0}</span> results
                </p>
              </div>
              <div className="flex flex-1 justify-between gap-2 sm:justify-end">
                <Button
                  disabled={page === 1}
                  variant="secondary"
                  onClick={() => onPageChange(page - 1)}
                >
                  Previous
                </Button>

                <Button
                  disabled={(total ?? 0) < perPage * page}
                  variant="secondary"
                  onClick={() => onPageChange(page + 1)}
                >
                  Next
                </Button>
              </div>
            </nav>
          ) : null}
        </div>

        {paginationType === PAGINATION_TYPE.CURSOR &&
        total &&
        total > syncs.length ? (
          <div className="mt-10 mb-2 flex items-center justify-center">
            <Button variant="secondary" onClick={() => onPageChange(page + 1)}>
              <ArrowDownCircleIcon className="h-6 w-6" /> Load more
            </Button>
          </div>
        ) : null}
      </div>
    );
  },
);

SyncsList.displayName = "SyncsList";
