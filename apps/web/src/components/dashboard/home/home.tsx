import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
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

import { SyncArticleDialog } from "../feeds/articles/dialog/sync-article-dialog";
import { ArticlesList } from "../feeds/articles/list/articles-list";
import { AddFeedDialog } from "../feeds/dialog/add-feed-dialog";
import { SyncsPerDay } from "../syncs/chart/syncs-per-day";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const Home = async () => {
  const { data } = await supabase().auth.getUser();
  const user = data.user;
  const range = getLastDays(10);

  const feeds = await api.user.getUserFeeds.query({});
  const { syncs, total: syncsCount } = await api.user.getUserSyncs.query({
    from: range.from,
    to: range.to,
  });
  const device = await api.user.getUserDevice.query();
  const { articles, total: articlesCount } =
    await api.user.getUserArticles.query({
      limit: 5,
    });

  const cardsValues = [
    feeds.count ?? 0,
    device ? "reMarkable 2" : "Not registered",
    syncsCount,
    dayjs
      .duration({
        minutes: articlesCount * 10,
      })
      .humanize(),
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
                      <ArrowRight className="w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                    </Link>
                  </CardFooter>
                </Card>
              ) : null;
            })}
          </div>
        </section>

        <div className="mx-auto mt-10 flex flex-wrap items-stretch justify-center gap-4 md:flex-nowrap lg:mt-12">
          <section className="flex basis-full flex-col gap-4 md:basis-3/5">
            <h2 className="text-lg font-medium sm:px-0">Syncs by day</h2>
            <SyncsPerDay range={range} syncs={syncs} />
          </section>
          <section className="mt-6 flex h-fit basis-full flex-col gap-4 md:mt-0 md:basis-2/5">
            <h2 className="text-lg font-medium sm:px-0">Recently synced</h2>
            <ArticlesList articles={articles} />
          </section>
        </div>
      </div>
    </>
  );
};
