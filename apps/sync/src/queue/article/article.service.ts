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
import { DEVICE_CLOUD_LABEL } from "../../utils/constants";

import type { DeviceType } from "@rssmarkable/database";

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
    device,
  }: {
    userId: string;
    url: string;
    syncId: string;
    device: DeviceType;
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
      `Trying to push output to the ${DEVICE_CLOUD_LABEL[device]} cloud...`,
    );

    await this.deviceStrategies[device].upload({
      title,
      pdf,
      userId,
    });

    await this.syncLogger(syncId).log(
      `Article uploaded to the ${DEVICE_CLOUD_LABEL[device]} cloud.`,
    );

    await this.syncLogger(syncId).verbose(
      `Article successfully synced: ${formatTime(
        dayjs().diff(articleSyncStartDate, "ms"),
      )}`,
    );
  }
}
