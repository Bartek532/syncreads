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

import type { DeviceType } from "@rssmarkable/database";
import type { SyncOptionsPayload } from "@rssmarkable/shared";

export class ArticleQueueService {
  constructor(
    @Inject(GENERATOR_STRATEGIES_TOKEN)
    private readonly generatorStrategies: GeneratorStrategiesProviderFactory,
    @Inject(DEVICE_STRATEGIES_TOKEN)
    private readonly deviceStrategies: DeviceStrategiesProviderFactory,
    @Inject(SYNC_LOGGER_PROVIDER_TOKEN)
    private readonly syncLogger: SyncLoggerProviderFactory,
  ) {}

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
    ).log(`[${url}](${url}) is being synced now...`);

    await this.syncLogger(syncId).log(
      `Generating ${options.format.toUpperCase()} file with article content...`,
    );

    console.log(options);

    const file = await this.generatorStrategies[options.format].generate(url);

    await this.syncLogger(syncId).log(
      `${options.format.toUpperCase()} file generated.`,
    );

    await this.syncLogger(syncId).log(
      `Trying to push output to the ${DEVICE_CLOUD_LABEL[device]} cloud...`,
    );

    await this.deviceStrategies[device].upload({
      title: "ddd",
      file: { content: file, type: options.format },
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
