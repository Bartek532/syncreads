import { Inject } from "@nestjs/common";

import { DeviceStrategiesProviderFactory } from "../../device/device-strategies.provider";
import { DEVICE_STRATEGIES_TOKEN } from "../../device/device.constants";
import {
  PDF_OPTIONS,
  PUPPETEER_PROVIDER_FACTORY_TOKEN,
} from "../../parser/puppeteer/puppeteer.constants";
import { PuppeteerProviderFactory } from "../../parser/puppeteer/puppeteer.provider";

export class ArticleQueueService {
  constructor(
    @Inject(PUPPETEER_PROVIDER_FACTORY_TOKEN)
    private readonly puppeteerProvider: PuppeteerProviderFactory,
    @Inject(DEVICE_STRATEGIES_TOKEN)
    private readonly deviceStrategies: DeviceStrategiesProviderFactory,
  ) {}

  async syncArticle({
    userId,
    url,
    folder,
  }: {
    userId: string;
    url: string;
    folder?: string;
  }) {
    const page = await this.puppeteerProvider;

    await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
    const title = await page.title();
    const pdf = await page.pdf(PDF_OPTIONS);

    const entry = await this.deviceStrategies.remarkable.upload({
      title,
      pdf,
      userId,
      ...(folder ? { folder } : {}),
    });

    await this.deviceStrategies.remarkable.syncEntry(userId, entry);
  }
}
