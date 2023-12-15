import { Newspaper } from "lucide-react";

import EmptySyncsIcon from "public/svg/empty-syncs.svg";

import { DASHBOARD_CARDS } from "../../../config/dashboard";
import { api } from "../../../trpc/server";
import { Empty } from "../../common/Empty";
import { SyncsList } from "../sync/list/SyncsList";

import { Profile } from "./profile/Profile";
import { Tile } from "./tile/Tile";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils";

export type DashboardHomeProps = {
  readonly page?: number;
  readonly perPage?: number;
};

export const DashboardHome = async ({ page, perPage }: DashboardHomeProps) => {
  const feeds = await api.user.getUserFeeds.query();
  const device = await api.user.getUserDevice.query();
  const syncs = await api.sync.getUserSyncs.query({ page, perPage });

  const cardsValues = [
    feeds.length,
    device ? "reMarkable 2" : "Not registered",
    syncs.count,
    "+20 hours",
  ];

  return (
    <>
      {/* <div className="bg-white shadow dark:bg-slate-800">
        <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between">
            <Profile device={device} />
            <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
              {<Button variant="secondary" onClick={() => setIsAddModalOpen(true)}>
              Add feed
            </Button>
            <Button onClick={() => setIsSyncArticleModalOpen(true)}>
              Sync article
            </Button>}
            </div>
          </div>
        </div>
      </div> */}
      <div className="flex flex-col justify-between gap-4 space-y-2 sm:flex-row sm:gap-8">
        <div className="flex flex-col justify-start space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, guest!
          </h1>
          <div className="flex items-center space-x-2">
            <div
              className={cn(
                "h-3 w-3 rounded-full",
                !!device ? "bg-green-400" : "bg-destructive",
              )}
            ></div>
            <span className="text-sm text-muted-foreground">
              {!!device
                ? "Device registered - sync active"
                : "Device not registered - sync inactive"}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">Add feed</Button>
          <Button>Sync article</Button>
        </div>
      </div>

      <div className="mt-16">
        <section className="mx-auto">
          <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Overview
          </h2>
          {/* <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DASHBOARD_CARDS.map((card, index) => {
              const value = cardsValues[index];

              return value || value === 0 ? (
                <Tile card={{ ...card, value }} key={card.title} />
              ) : null;
            })}
          </div> */}
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DASHBOARD_CARDS.map((card, index) => {
              const value = cardsValues[index];

              return value || value === 0 ? (
                <Card key={card.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {card.title}
                    </CardTitle>
                    <card.icon />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{value}</div>
                    <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
              ) : null;
            })}
          </div>
        </section>

        <section className="mx-auto mt-10 lg:mt-12">
          <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-white sm:px-0">
            Recent syncs
          </h2>
          {syncs.count ? (
            <div className="-mx-4 mt-4 sm:mx-0">
              <SyncsList syncs={syncs.data} total={syncs.count} />
            </div>
          ) : (
            <Empty onCreateNew={() => {}}>
              <EmptySyncsIcon className="h-50 mx-auto w-40 text-gray-400 dark:text-gray-500" />
              <span className="mt-6 block text-lg font-medium text-gray-900 dark:text-white">
                You haven&apos;t synced any feeds yet!
              </span>
            </Empty>
          )}
        </section>
      </div>
    </>
  );
};
