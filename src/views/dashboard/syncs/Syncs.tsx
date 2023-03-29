import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import EmptySyncsIcon from "public/svg/empty-syncs.svg";

import { Button } from "../../../components/common/Button";
import { Empty } from "../../../components/common/Empty";
import { SyncsList } from "../../../components/dashboard/sync/SyncsList";
import { PAGINATION_TYPE } from "../../../config/dashboard";
import { useGenericLoader } from "../../../hooks/useGenericLoader";
import { onPromise } from "../../../utils/functions";
import { trpc } from "../../../utils/trpc";

import type { Sync } from "@prisma/client";
import type { TRPCError } from "@trpc/server";

export const SyncsView = () => {
  const [{ page, perPage, syncs, total }, setSyncsData] = useState(() => ({
    page: 1,
    perPage: 20,
    syncs: [] as Sync[],
    total: 0,
  }));

  const syncFeedsMutation = trpc.user.syncUserFeeds.useMutation();

  const { isLoading } = trpc.sync.getUserSyncs.useQuery(
    {
      page,
      perPage,
    },
    {
      onSuccess: ({ total, syncs }) =>
        setSyncsData((previousData) => ({
          ...previousData,
          syncs: [...previousData.syncs, ...syncs],
          total,
        })),
      queryKey: ["sync.getUserSyncs", { page, perPage }],
      keepPreviousData: true,
    },
  );

  const feedsSyncHandler = async () => {
    await toast.promise(syncFeedsMutation.mutateAsync(), {
      loading: "Syncing...",
      success: () => "Sync completed successfully!",
      error: (err: TRPCError | Error) => err.message,
    });
  };

  const pageChangeHandler = useCallback(
    (page: number) =>
      setSyncsData((previousData) => ({ ...previousData, page })),
    [],
  );

  useGenericLoader(isLoading);

  return (
    <section className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:mt-12 lg:px-8">
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-medium leading-6 text-gray-900">
          You synced data <b>{total}</b> times!
        </h2>
        <Button onClick={onPromise(feedsSyncHandler)}>
          <ArrowPathIcon className="h-6 w-6" />{" "}
          <span className="hidden sm:inline">Sync now</span>
        </Button>
      </div>

      {syncs.length ? (
        <div className="-mx-4 mt-8 sm:mx-0">
          <SyncsList
            onPageChange={pageChangeHandler}
            page={page}
            syncs={syncs}
            total={total}
            perPage={perPage}
            paginationType={PAGINATION_TYPE.CURSOR}
          />
        </div>
      ) : (
        <Empty onCreateNew={onPromise(feedsSyncHandler)}>
          <EmptySyncsIcon className="h-50 mx-auto w-40 text-gray-400" />
          <span className="mt-6 block text-lg font-medium text-gray-900">
            You haven&apos;t synced any feeds yet!
          </span>
        </Empty>
      )}
    </section>
  );
};
