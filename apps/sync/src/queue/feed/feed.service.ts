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

export class FeedQueueService {
  constructor(
    @Inject(PUPPETEER_PROVIDER_FACTORY_TOKEN)
    private readonly puppeteerProvider: PuppeteerProviderFactory,
    @Inject(DEVICE_STRATEGIES_TOKEN)
    private readonly deviceStrategies: DeviceStrategiesProviderFactory,
    @Inject(SYNC_LOGGER_PROVIDER_TOKEN)
    private readonly syncLogger: SyncLoggerProviderFactory,
  ) {}

  private async upsertFeedFolder(
    userId: string,
    syncId: string,
    name?: string,
  ) {
    if (!name) {
      return;
    }

    await this.syncLogger(syncId).log(
      `Searching for folder with name *${name}*...`,
    );

    const folder = await this.deviceStrategies.remarkable.getFolder(
      userId,
      name,
    );

    if (folder) {
      await this.syncLogger(syncId).log(
        `Folder with name *${name}* found on the device.`,
      );

      return folder.id;
    }

    await this.syncLogger(syncId).log(`Folder not found, creating new one...`);

    const newFolder = await this.deviceStrategies.remarkable.createFolder(
      userId,
      name,
    );

    await this.syncLogger(syncId).log(
      `Folder named *${name}* created on the device.`,
    );

    return newFolder.id;
  }

  async syncArticle({
    userId,
    url,
    folder,
    syncId,
  }: {
    userId: string;
    url: string;
    folder?: string;
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

    const folderId = await this.upsertFeedFolder(userId, syncId, folder);

    const entry = await this.deviceStrategies.remarkable.upload({
      title,
      pdf,
      userId,
      ...(folderId ? { folderId } : {}),
    });

    await this.syncLogger(syncId).log(
      `Article uploaded to the reMarkable cloud.`,
    );

    await this.deviceStrategies.remarkable.syncEntry(userId, entry);

    await this.syncLogger(syncId).verbose(
      `Article successfully synced: ${formatTime(
        dayjs().diff(articleSyncStartDate, "ms"),
      )}`,
    );
  }
}
