import { remarkable, type RemarkableApi } from "rmapi-js";
import { webcrypto } from "crypto";
import puppeteer, { type Browser, type Page } from "puppeteer";
import Parser from "rss-parser";
import { prisma } from "../../server/db/client";
import type { User } from "@prisma/client";
import { PDF_OPTIONS } from "../../utils/consts";
import type { NextApiRequest, NextApiResponse } from "next";

const syncArticle = async ({
  url,
  page,
  api,
}: {
  url: string;
  page: Page;
  api: RemarkableApi;
}) => {
  await page.goto(url, {
    waitUntil: "networkidle0",
  });
  await page.emulateMediaType("screen");
  const title = await page.title();

  const pdf = await page.pdf(PDF_OPTIONS);
  const entry = await api.putPdf(title, pdf);
  const [root, gen] = await api.getRootHash();
  const rootEntries = await api.getEntries(root);
  rootEntries.push(entry);
  const { hash } = await api.putEntries("", rootEntries);
  const nextGen = await api.putRootHash(hash, gen);
  await api.syncComplete(nextGen);
};

const syncFeed = async ({
  url,
  user,
  api,
  parser,
  browser,
}: {
  url: string;
  user: User;
  api: RemarkableApi;
  parser: Parser;
  browser: Browser;
}) => {
  const parsed = await parser.parseURL(url);
  const page = await browser.newPage();
  const items = parsed.items
    .slice(0, 1)
    .filter((item): item is { link: string } => !!item.link);
  console.time("sync");

  await Promise.all(
    items.map((item) => syncArticle({ url: item.link, page, api }))
  );

  console.timeEnd("sync");
};

const syncUserFeeds = async ({
  username,
  parser: passedParser,
  browser: passedBrowser,
}: {
  username: string;
  browser?: Browser;
  parser?: Parser;
}) => {
  const parser = passedParser || new Parser();
  const browser = passedBrowser || (await puppeteer.launch());

  const user = await prisma.user.findUnique({
    where: { username },
    include: { feeds: true },
  });

  if (!user) {
    throw new Error(`User ${username} not found!`);
  }

  const api = await remarkable(user.deviceToken, {
    subtle: webcrypto.subtle,
  });

  await Promise.all(
    user.feeds.map((feed) =>
      syncFeed({ url: feed.url, user, api, parser, browser })
    )
  );

  if (!passedBrowser) {
    await browser.close();
  }
};

const syncAll = async () => {
  const parser = new Parser();
  const browser = await puppeteer.launch();
  const users = await prisma.user.findMany();

  await Promise.all(
    users.map(({ username }) => syncUserFeeds({ username, parser, browser }))
  );

  return browser.close();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await syncAll();

    return res.status(200).json({ status: "Success", message: "Success" });
  } catch (e: any) {
    console.log(e);

    return res
      .status(e?.status || 400)
      .json({ status: "error", message: e || "Bad request" });
  }
}
