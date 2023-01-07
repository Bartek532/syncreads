import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "react-hot-toast";

import EmptyIcon from "public/svg/empty.svg";
import { Button } from "src/components/common/button/Button";
import { Empty } from "src/components/common/empty/Empty";
import { AddFeedModal } from "src/components/modal/feed/AddFeedModal";
import { FeedTile } from "src/components/tile/feedTile/FeedTile";
import { trpc } from "src/utils/trpc";

import type { TRPCError } from "@trpc/server";
import type { CreateFeedInput } from "src/utils/validation";

export const FeedsView = () => {
  const utils = trpc.useContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const feeds = trpc.user.getUserFeeds.useQuery();

  const addFeedMutation = trpc.feed.createFeed.useMutation({
    onSuccess: () => utils.user.getUserFeeds.invalidate(),
  });

  const deleteFeedMutation = trpc.feed.deleteFeed.useMutation({
    onSuccess: () => utils.user.getUserFeeds.invalidate(),
  });

  const onAdd = async ({ url }: CreateFeedInput) => {
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

  const handleDeleteFeed = async ({ url }: { url: string }) => {
    await toast.promise(
      deleteFeedMutation.mutateAsync({
        url,
      }),
      {
        loading: "Deleting feed...",
        success: ({ message }) => message,
        error: (err: TRPCError | Error) => err.message,
      },
    );
  };

  return (
    <>
      <AddFeedModal
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        onAdd={onAdd}
      />
      <section className="mx-auto mt-12 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            All feeds
          </h2>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <PlusIcon className="h-6 w-6" /> Add feed
          </Button>
        </div>
        {feeds.data?.length ? (
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {feeds.data.map((feed) => (
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              <FeedTile
                url={feed.url}
                key={feed.id}
                onDelete={handleDeleteFeed}
              />
            ))}
          </div>
        ) : (
          <Empty onCreateNew={() => setIsAddModalOpen(true)}>
            <EmptyIcon className="mx-auto h-16 w-16 text-gray-400" />
            <span className="mt-4 block text-base font-medium text-gray-900">
              Add your first feed!
            </span>
          </Empty>
        )}
      </section>
    </>
  );
};
