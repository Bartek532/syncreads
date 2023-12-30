import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DASHBOARD_CARDS } from "@/config/dashboard";
import { supabase } from "@/lib/supabase/server";
import { api } from "@/trpc/server";
import { cn, getLastDays, getName } from "@/utils";

import { AddFeedDialog } from "../feeds/dialog/add-feed-dialog";
import { SyncArticleDialog } from "../feeds/dialog/sync-article-dialog";
import { SyncsPerDay } from "../syncs/chart/syncs-per-day";

export const Home = async () => {
  const { data } = await supabase().auth.getSession();
  const user = data.session?.user;
  const range = getLastDays(10);

  const feeds = await api.user.getUserFeeds.query({});
  const syncsWithArticles = await api.sync.getUserSyncs.query({
    from: range.from,
    to: range.to,
    withArticles: true,
  });
  const device = await api.user.getUserDevice.query();

  const cardsValues = [
    feeds.count ?? 0,
    device ? "reMarkable 2" : "Not registered",
    syncsWithArticles.length,
    syncsWithArticles.reduce((acc, { Article }) => acc + Article.length, 0),
  ];

  return (
    <>
      <div className="flex flex-col justify-between gap-4 space-y-2 sm:flex-row sm:gap-8">
        <div className="flex flex-col justify-start space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {user ? getName(user)?.split(" ")[0] : "guest"}!
          </h1>
          <div className="ml-1 flex items-center space-x-2">
            <div
              className={cn(
                "h-3 w-3 rounded-full",
                !!device ? "bg-success" : "bg-destructive",
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
          <AddFeedDialog>
            <Button variant="outline">Add feed</Button>
          </AddFeedDialog>
          <SyncArticleDialog>
            <Button>Sync article</Button>
          </SyncArticleDialog>
        </div>
      </div>

      <div className="mt-16">
        <section className="mx-auto">
          <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Overview
          </h2>
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
                    <span className="text-2xl font-bold">{value}</span>
                  </CardContent>
                  <CardFooter className="ml-auto -mt-5 -mb-2 justify-end text-xs">
                    <Link
                      href={card.href}
                      className="group flex items-center justify-center gap-2 underline hover:no-underline"
                    >
                      View details
                      <ArrowRight className="w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </CardFooter>
                </Card>
              ) : null;
            })}
          </div>
        </section>

        <div className="mx-auto mt-10 flex flex-wrap items-start justify-center gap-4 md:flex-nowrap lg:mt-12">
          <section className="flex basis-full flex-col gap-4 md:basis-3/5">
            <h2 className="text-lg font-medium sm:px-0">Syncs stats</h2>
            <div className="rounded-lg bg-background p-2 pr-4 pt-6 shadow-sm">
              <SyncsPerDay range={range} syncs={syncsWithArticles} />
            </div>
          </section>
          <section className="mt-6 flex basis-full flex-col gap-4 md:mt-0 md:basis-2/5">
            <h2 className="text-lg font-medium sm:px-0">Recently synced</h2>
            <div className="h-[350px] w-full rounded-lg bg-background shadow-sm"></div>
          </section>
        </div>
      </div>
    </>
  );
};
