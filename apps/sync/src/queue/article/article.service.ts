import { Inject } from "@nestjs/common";
import dayjs from "dayjs";

import { DeviceStrategiesProviderFactory } from "../../device/device-strategies.provider";
import { DEVICE_STRATEGIES_TOKEN } from "../../device/device.constants";
import { GeneratorStrategiesProviderFactory } from "../../generator/generator-strategies.provider";
import { GENERATOR_STRATEGIES_TOKEN } from "../../generator/generator.constants";
import { SYNC_LOGGER_PROVIDER_TOKEN } from "../../sync/logger/logger.constants";
import { SyncLoggerProviderFactory } from "../../sync/logger/logger.provider";
import { formatTime } from "../../sync/logger/utils/time";
import { DEVICE_CLOUD_LABEL } from "../../utils/constants";

import type { DeviceType } from "@syncreads/database";
import type { SyncOptionsPayload } from "@syncreads/shared";

export class ArticleQueueService {
  constructor(
    @Inject(GENERATOR_STRATEGIES_TOKEN)
    private readonly generatorStrategies: GeneratorStrategiesProviderFactory,
    @Inject(DEVICE_STRATEGIES_TOKEN)
    private readonly deviceStrategies: DeviceStrategiesProviderFactory,
    @Inject(SYNC_LOGGER_PROVIDER_TOKEN)
    private readonly syncLogger: SyncLoggerProviderFactory,
  ) {}

  private async upsertFolder(
    userId: string,
    syncId: string,
    device: DeviceType,
    name: string,
  ) {
    const strategy = this.deviceStrategies[device];

    if (!strategy.getFolder || !strategy.createFolder) {
      await this.syncLogger(syncId).warn(
        `Folders are not supported for ${DEVICE_CLOUD_LABEL[device]} cloud yet, syncing to the root folder...`,
      );
      return;
    }

    await this.syncLogger(syncId).log(
      `Searching for folder with name *${name}*...`,
    );

    const folder = await strategy.getFolder(userId, name);

    if (folder) {
      await this.syncLogger(syncId).log(
        `Folder with name *${name}* found on the device.`,
      );

      return folder.id;
    }

    await this.syncLogger(syncId).log(`Folder not found, creating new one...`);

    const newFolder = await strategy.createFolder(userId, name);

    await this.syncLogger(syncId).log(
      `Folder named *${name}* created on the device.`,
    );

    return newFolder.id;
  }

  async syncArticle({
    userId,
    syncId,
    url,
    device,
    options,
  }: {
    userId: string;
    syncId: string;
    url: string;
    device: DeviceType;
    options: SyncOptionsPayload;
  }) {
    const { updatedAt: articleSyncStartDate } = await this.syncLogger(
      syncId,
    ).log(`Preparing to sync article from ${url}...`);

    const { title, generate } = await this.generatorStrategies[
      options.format
    ].prepare(url);

    await this.syncLogger(syncId).log(
      `[${title}](${url}) is being synced now...`,
    );

    await this.syncLogger(syncId).log(
      `Generating ${options.format.toUpperCase()} file with article content...`,
    );

    const { file } = await generate();

    await this.syncLogger(syncId).log(
      `${options.format.toUpperCase()} file generated.`,
    );

    await this.syncLogger(syncId).log(
      `Trying to push output to the ${DEVICE_CLOUD_LABEL[device]} cloud...`,
    );

    const folder = options.folder;

    if (!folder) {
      await this.syncLogger(syncId).log(`Syncing to the root folder...`);
    }

    const folderId = folder
      ? await this.upsertFolder(userId, syncId, device, folder)
      : null;

    await this.deviceStrategies[device].upload({
      title,
      file: { content: file, type: options.format },
      userId,
      ...(folderId ? { folderId } : {}),
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
