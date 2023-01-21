import { SyncStatus } from "@prisma/client";
import { webcrypto } from "crypto";
import dayjs from "dayjs";
import puppeteer, { type Page, type Browser } from "puppeteer-core";
import { remarkable, type RemarkableApi } from "rmapi-js";
import Parser from "rss-parser";

import { PDF_OPTIONS } from "../../config/sync";
import { env } from "../../env/server.mjs";
import { prisma } from "../../server/db/client";
import { getFolder, syncEntry } from "../../server/services/remarkable.service";
import { createSync, updateSync } from "../../server/services/sync.service";
import {
  getAllUsers,
  getUserByEmail,
  getUserFeed,
  getUserFeeds,
} from "../../server/services/user.service";
import { ApiError, HTTP_STATUS_CODE } from "../../utils/exceptions";
import { nonNullable } from "../../utils/functions";

import type { NextApiRequest, NextApiResponse } from "next";

const BROWSER_OPTIONS = {
  executablePath: env.CHROME_BIN,
  args: [
    // Required for Docker version of Puppeteer
    "--no-sandbox",
    "--disable-setuid-sandbox",
    // This will write shared memory files into /tmp instead of /dev/shm,
    // because Docker’s default for /dev/shm is 64MB
    "--disable-dev-shm-usage",
  ],
};

interface FeedItem {
  link: string;
  pubDate: string;
  title?: string;
}

const syncArticle = async ({
  article,
  api,
  page,
  folderId = "",
}: {
  article: FeedItem;
  api: RemarkableApi;
  page: Page;
  folderId?: string;
}) => {
  await page.goto(article.link, { waitUntil: "networkidle0", timeout: 0 });
  const pdf = await page.pdf(PDF_OPTIONS);
  const title = article.title ?? (await page.title());

  const pdfEntry = await api.putPdf(title, pdf, { parent: folderId });
  await syncEntry({ api, entry: pdfEntry });
};

const syncFeed = async ({
  url,
  email,
  api,
  parser,
  page,
  folderId,
}: {
  url: string;
  email: string;
  api: RemarkableApi;
  parser: Parser;
  page: Page;
  folderId: string;
}) => {
  const parsed = await parser.parseURL(url);
  const feed = await getUserFeed({ email, url });

  const articles = parsed.items
    .filter((item): item is FeedItem => !!item.link && !!item.pubDate)
    .filter((item, index) =>
      feed?.lastSyncDate
        ? dayjs(item.pubDate).isAfter(feed.lastSyncDate)
        : index < (feed?.startArticlesCount ?? 1),
    );

  for (const article of articles) {
    await syncArticle({ article, api, page, folderId });
  }

  await prisma.userFeed.update({
    where: {
      userId_feedId: {
        userId: feed!.userId,
        feedId: feed!.feedId,
      },
    },
    data: {
      lastSyncDate: articles[0] ? new Date(articles[0].pubDate) : new Date(),
    },
  });

  return { url, articles };
};

export const syncUserFeeds = async ({
  email,
  parser: passedParser,
  browser: passedBrowser,
}: {
  email: string;
  parser?: Parser;
  browser?: Browser;
}) => {
  const parser = passedParser ?? new Parser();
  const browser = passedBrowser ?? (await puppeteer.launch(BROWSER_OPTIONS));
  const page = await browser.newPage();

  const user = await getUserByEmail({ email });

  if (!user?.email) {
    console.error(`User with email ${email} not found!`);
    return;
  }

  if (!user.device) {
    console.error(`Device not found, register your device first!`);
    return;
  }

  const feeds = await getUserFeeds({ email: user.email });
  const sync = await createSync({ email: user.email });

  try {
    const api = webcrypto
      ? await remarkable(user.device.token, {
          subtle: webcrypto.subtle,
        })
      : await remarkable(user.device.token);

    const syncedFeeds: {
      url: string;
      articles: FeedItem[];
    }[] = [];

    for (const feed of feeds) {
      const { documentId: folderId } = await getFolder({
        api,
        name: user.folder,
      });

      const syncedFeed = await syncFeed({
        url: feed.url,
        email: user.email,
        api,
        page,
        parser,
        folderId,
      });
      syncedFeeds.push(syncedFeed);
    }

    await updateSync({
      id: sync.id,
      data: {
        finishedAt: new Date(),
        syncedArticlesCount: syncedFeeds.map(({ articles }) => articles).flat()
          .length,
        status: SyncStatus.SUCCESS,
      },
    });

    return { email, feeds: syncedFeeds };
  } catch (e: unknown) {
    console.error(user, e);

    await updateSync({
      id: sync.id,
      data: {
        finishedAt: new Date(),
        status: SyncStatus.FAILED,
      },
    });

    return;
  }
};

const syncAll = async () => {
  console.time("sync");
  const parser = new Parser();
  const browser = await puppeteer.launch(BROWSER_OPTIONS);

  const users = await getAllUsers();

  const data = await Promise.all(
    users.map(({ email }) =>
      syncUserFeeds({ email: email ?? "", parser, browser }),
    ),
  );

  console.timeEnd("sync");

  return {
    data,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (!(req.headers["api-key"] === env.API_KEY)) {
      throw new ApiError(HTTP_STATUS_CODE.UNAUTHORIZED, "Missing api key!");
    }

    const { data } = await syncAll();

    const syncedFeeds = data
      .filter(nonNullable)
      .map(({ feeds }) => feeds)
      .flat();
    const syncedArticles = syncedFeeds.map(({ articles }) => articles).flat();

    return res.status(200).json({
      status: "Success",
      message: `Successfully synced ${syncedFeeds.length} feed(s) - ${syncedArticles.length} article(s) for ${data.length} user(s)`,
    });
  } catch (e: unknown) {
    console.log(e);
    if (e instanceof ApiError) {
      return res.status(e.status).json({ status: "Error", message: e.message });
    }

    if (e instanceof Error) {
      return res.status(500).json({ status: "Error", message: e.message });
    }

    return res
      .status(500)
      .json({ status: "Error", message: "Internal Server Error" });
  }
}
