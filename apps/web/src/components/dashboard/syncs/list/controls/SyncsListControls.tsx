"use client";

// import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { memo } from "react";

import {
  SYNCS_PAGINATION_DEFAULT_PAGE,
  SYNCS_PAGINATION_DEFAULT_PER_PAGE,
} from "../../../../../config/sync";
import { Button } from "../../../../common/Button";

interface SyncsListControlsProps {
  readonly total: number;
}

const usePagination = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const page =
    Number(searchParams?.get("page")) || SYNCS_PAGINATION_DEFAULT_PAGE;
  const perPage =
    Number(searchParams?.get("perPage")) || SYNCS_PAGINATION_DEFAULT_PER_PAGE;

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams ?? undefined);
    params.set("page", newPage.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  return { page, perPage, setPage };
};

export const SyncsListControlsOffset = memo<SyncsListControlsProps>(
  ({ total }) => {
    const { page, perPage, setPage } = usePagination();
    return (
      <nav
        className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 dark:border-slate-900 dark:bg-slate-800 sm:px-6"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700 dark:text-gray-500">
            Showing{" "}
            <span className="font-medium">{(page - 1) * perPage + 1}</span> to{" "}
            <span className="font-medium">
              {total && total < perPage * page ? total : perPage * page}
            </span>{" "}
            of <span className="font-medium">{total ?? 0}</span> results
          </p>
        </div>
        <div className="flex flex-1 justify-between gap-2 sm:justify-end">
          <Button
            disabled={(total ?? 0) < perPage * page}
            variant="secondary"
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>

          <Button
            disabled={(total ?? 0) < perPage * page}
            variant="secondary"
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </nav>
    );
  },
);

export const SyncsListControlsCursor = memo(() => {
  const { page, setPage } = usePagination();

  return (
    <div className="mt-10 mb-2 flex items-center justify-center">
      <Button variant="secondary" onClick={() => setPage(page + 1)}>
        {/* <ArrowDownCircleIcon className="h-6 w-6" /> Load more */}
      </Button>
    </div>
  );
});

SyncsListControlsCursor.displayName = "SyncsListControlsCursor";
SyncsListControlsOffset.displayName = "SyncsListControlsOffset";
