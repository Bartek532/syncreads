import { Inject, Injectable } from "@nestjs/common";

import { DeviceStrategiesProviderFactory } from "../device/device-strategies.provider";
import { DEVICE_STRATEGIES_TOKEN } from "../device/device.constants";
import {
  PDF_OPTIONS,
  PUPPETEER_PROVIDER_FACTORY_TOKEN,
} from "../parser/puppeteer/puppeteer.constants";
import { PuppeteerProviderFactory } from "../parser/puppeteer/puppeteer.provider";
import { SUPABASE_CLIENT_FACTORY_TOKEN } from "../supabase/supabase.constants";
import { SupabaseProviderFactory } from "../supabase/supabase.provider";

import type { Sync } from "@rssmarkable/database";

@Injectable()
export class SyncService {
  constructor(
    @Inject(SUPABASE_CLIENT_FACTORY_TOKEN)
    private readonly supabaseProvider: SupabaseProviderFactory,
    @Inject(PUPPETEER_PROVIDER_FACTORY_TOKEN)
    private readonly puppeteerProvider: PuppeteerProviderFactory,
    @Inject(DEVICE_STRATEGIES_TOKEN)
    private readonly deviceStrategies: DeviceStrategiesProviderFactory,
  ) {}

  updateFeedSyncDate({
    userId,
    feedId,
    date,
  }: {
    userId: string;
    feedId: string;
    date: Date;
  }) {
    return this.supabaseProvider()
      .from("UserFeed")
      .update({ lastSyncDate: date.toString() })
      .match({ userId, feedId })
      .throwOnError();
  }

  updateSync({ id, data }: { id: string; data: Partial<Sync> }) {
    return this.supabaseProvider()
      .from("Sync")
      .update(data)
      .match({ id })
      .throwOnError();
  }

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
