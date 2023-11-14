import { SyncTrigger } from "@prisma/client";
import dayjs from "dayjs";

import { PDF_OPTIONS } from "../../../config/sync";
import { createSyncLogger } from "../../../server/controllers/sync.controller";
import { syncEntry } from "../../../server/services/remarkable.service";
import { createSync, getPage } from "../../../server/services/sync.service";
import { formatTime } from "../../../utils/functions";

import type { FeedArticle } from "../../../types/feed.types";
import type { Logger } from "../../../types/log.types";
import type { Sync } from "@prisma/client";
import type { Page } from "puppeteer-core";
import type { RemarkableApi } from "rmapi-js";

export const syncArticle = async ({
  userId,
  article,
  api,
  page: passedPage,
  sync: passedSync,
  logger: passedLogger,
  folderId = "",
  trigger = SyncTrigger.MANUAL,
}: {
  userId: number;
  article: Omit<FeedArticle, "pubDate">;
  api: RemarkableApi;
  page?: Page;
  folderId?: string;
  sync?: Sync;
  logger?: Logger;
  trigger?: SyncTrigger;
}) => {
  const sync = passedSync ?? (await createSync({ id: userId, trigger }));
  const logger = passedLogger ?? (await createSyncLogger(sync.id));

  await logger.info(`Article synchronization started.`);

  const page = passedPage ?? (await getPage());
  await page.goto(article.link, { waitUntil: "networkidle0", timeout: 0 });
  const title = article.title ?? (await page.title());

  const { updatedAt: articleSyncStartDate } = await logger.info(
    `[${title}](${article.link}) is being synced now...`,
  );
  await logger.info(`Generating PDF file with article content...`);

  const pdf = await page.pdf(PDF_OPTIONS);

  await logger.info(`PDF file generated.`);
  await logger.info(`Trying to push output to the reMarkable cloud...`);

  const pdfEntry = await api.putPdf(title, pdf, { parent: folderId });
  await syncEntry({ api, entry: pdfEntry });

  await logger.verbose(
    `Article successfully synced: ${formatTime(
      dayjs().diff(articleSyncStartDate, "ms"),
    )}`,
  );
};
