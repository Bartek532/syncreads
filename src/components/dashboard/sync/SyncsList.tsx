import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { memo } from "react";

import { PAGINATION_TYPE } from "../../../config/dashboard";
import { Button } from "../../common/Button";

import { SyncItem } from "./SyncItem";

import type { Sync } from "@prisma/client";

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
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="hidden sm:table-header-group">
              <tr>
                <th
                  className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  Sync uid
                </th>
                <th
                  className="whitespace-nowrap bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  Trigger
                </th>
                <th
                  className="hidden whitespace-nowrap bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900 md:table-cell"
                  scope="col"
                >
                  Articles
                </th>
                <th
                  className=" bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 "
                  scope="col"
                >
                  Status
                </th>
                <th
                  className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {syncs.map((sync) => (
                <SyncItem sync={sync} key={sync.id} />
              ))}
            </tbody>
          </table>

          {paginationType === PAGINATION_TYPE.OFFSET ? (
            <nav
              className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
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
