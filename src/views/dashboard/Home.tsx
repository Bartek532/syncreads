import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import EmptySyncsIcon from "public/svg/empty-syncs.svg";

import { Button } from "../../components/common/Button";
import { Empty } from "../../components/common/Empty";
import { Profile } from "../../components/dashboard/profile/Profile";
import { SyncsList } from "../../components/dashboard/sync/SyncsList";
import { Tile } from "../../components/dashboard/tile/Tile";
import { AddFeedModal } from "../../components/modal/feed/AddFeedModal";
import { useGenericLoader } from "../../hooks/useGenericLoader";
import { DASHBOARD_CARDS } from "../../utils/consts";
import { trpc } from "../../utils/trpc";

import type { CreateFeedInput } from "../../utils/validation";
import type { Sync } from "@prisma/client";
import type { TRPCError } from "@trpc/server";

export const HomeView = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [{ page, perPage, syncs, total, articles }, setSyncsData] = useState(
    () => ({
      page: 1,
      perPage: 10,
      syncs: [] as Sync[],
      total: 0,
      articles: 0,
    }),
  );
  const utils = trpc.useContext();
  const { data } = useSession();

  const addFeedMutation = trpc.feed.createFeed.useMutation({
    onSuccess: () => utils.user.getUserFeeds.invalidate(),
  });

  const { data: feeds, isLoading: areFeedsLoading } =
    trpc.user.getUserFeeds.useQuery();
  const { data: device, isLoading: isDeviceLoading } =
    trpc.user.getUserDevice.useQuery();
  trpc.user.getUserSyncs.useQuery(
    {
      page: page,
      perPage: perPage,
    },
    {
      onSuccess: ({ total, syncs, articles }) =>
        setSyncsData((previousData) => ({
          ...previousData,
          syncs,
          total,
          articles,
        })),
      queryKey: ["user.getUserSyncs", { page: page, perPage: perPage }],
      keepPreviousData: true,
    },
  );

  const feedAddHandler = async ({ url }: CreateFeedInput) => {
    await toast.promise(
      addFeedMutation.mutateAsync({
        url,
      }),
      {
        loading: "Adding feed...",
        success: ({ message }) => {
          setIsAddModalOpen(false);
          return message;
        },
        error: (err: TRPCError | Error) => err.message,
      },
    );
  };

  const pageChangeHandler = useCallback(
    (page: number) =>
      setSyncsData((previousData) => ({ ...previousData, page })),
    [],
  );

  const cardsValues = [
    feeds?.length ?? 0,
    device ? "reMarkable 2" : "Not registered",
    syncs.length ? articles : "Unavailable",
  ];

  useGenericLoader([areFeedsLoading, isDeviceLoading]);

  return (
    <>
      <AddFeedModal
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        onAdd={feedAddHandler}
      />
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between">
            <Profile user={data?.user} isRegistered={!!device} />
            <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
              <Button
                variant="secondary"
                onClick={() => setIsAddModalOpen(true)}
              >
                Add feed
              </Button>
              <Button>Sync feeds</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Overview
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DASHBOARD_CARDS.map((card, index) => (
              <Tile
                card={{ ...card, value: cardsValues[index]! }}
                key={card.title}
              />
            ))}
          </div>
        </div>

        <section className="mx-auto mt-10 max-w-6xl sm:px-6 lg:mt-12 lg:px-8">
          <h2 className="px-4 text-lg font-medium leading-6 text-gray-900 sm:px-0">
            Recent syncs
          </h2>
          {syncs.length ? (
            <div className="mt-4">
              <SyncsList
                syncs={syncs}
                total={total}
                page={page}
                perPage={perPage}
                onPageChange={pageChangeHandler}
              />
            </div>
          ) : (
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            <Empty onCreateNew={() => {}}>
              <EmptySyncsIcon className="h-50 mx-auto w-40 text-gray-400" />
              <span className="mt-6 block text-lg font-medium text-gray-900">
                You haven&apos;t synced any feeds yet!
              </span>
            </Empty>
          )}
        </section>
      </div>
    </>
  );
};
