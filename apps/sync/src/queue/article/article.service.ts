import { Inject } from "@nestjs/common";
import dayjs from "dayjs";

import { DeviceStrategiesProviderFactory } from "../../device/device-strategies.provider";
import { DEVICE_STRATEGIES_TOKEN } from "../../device/device.constants";
import {
  PDF_OPTIONS,
  PUPPETEER_PROVIDER_FACTORY_TOKEN,
} from "../../parser/puppeteer/puppeteer.constants";
import { PuppeteerProviderFactory } from "../../parser/puppeteer/puppeteer.provider";
import { SYNC_LOGGER_PROVIDER_TOKEN } from "../../sync/logger/logger.constants";
import { SyncLoggerProviderFactory } from "../../sync/logger/logger.provider";
import { formatTime } from "../../sync/logger/utils/time";

export class ArticleQueueService {
  constructor(
    @Inject(PUPPETEER_PROVIDER_FACTORY_TOKEN)
    private readonly puppeteerProvider: PuppeteerProviderFactory,
    @Inject(DEVICE_STRATEGIES_TOKEN)
    private readonly deviceStrategies: DeviceStrategiesProviderFactory,
    @Inject(SYNC_LOGGER_PROVIDER_TOKEN)
    private readonly syncLogger: SyncLoggerProviderFactory,
  ) {}

  async syncArticle({
    userId,
    url,
    syncId,
  }: {
    userId: string;
    url: string;
    syncId: string;
  }) {
    const page = await this.puppeteerProvider;

    await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
    const title = await page.title();

    const { updatedAt: articleSyncStartDate } = await this.syncLogger(
      syncId,
    ).log(`[${title}](${url}) is being synced now...`);

    await this.syncLogger(syncId).log(
      `Generating PDF file with article content...`,
    );

    const pdf = await page.pdf(PDF_OPTIONS);

    await this.syncLogger(syncId).log(`PDF file generated.`);

    await this.syncLogger(syncId).log(
      `Trying to push output to the reMarkable cloud...`,
    );

    const entry = await this.deviceStrategies.remarkable.upload({
      title,
      pdf,
      userId,
    });

    await this.deviceStrategies.remarkable.syncEntry(userId, entry);

    await this.syncLogger(syncId).verbose(
      `Article successfully synced: ${formatTime(
        dayjs().diff(articleSyncStartDate, "ms"),
      )}`,
    );
  }
}
