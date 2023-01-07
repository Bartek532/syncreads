import { useSession } from "next-auth/react";

import { Button } from "src/components/common/button/Button";
import { Profile } from "src/components/dashboard/profile/Profile";
import { Tile } from "src/components/dashboard/tile/Tile";
import { DASHBOARD_CARDS } from "src/utils/consts";
import { trpc } from "src/utils/trpc";

export const HomeView = () => {
  const { data } = useSession();

  const { data: feeds } = trpc.user.getUserFeeds.useQuery();

  const values = [feeds?.length ?? 0, "RM210", "Coming soon..."];

  return (
    <>
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between">
            <Profile user={data?.user} />
            <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
              <Button isSecondary>Add feed</Button>
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
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DASHBOARD_CARDS.map((card, index) => (
              <Tile card={{ ...card, value: values[index] }} key={card.title} />
            ))}
          </div>
        </div>

        <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
          Recent syncs
        </h2>
        <h3 className="mx-auto mt-2 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-400 sm:px-6 lg:px-8">
          Coming soon
        </h3>
      </div>
    </>
  );
};
