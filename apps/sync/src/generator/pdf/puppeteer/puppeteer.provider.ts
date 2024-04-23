import { PuppeteerBlocker } from "@cliqz/adblocker-puppeteer";
import { ConfigService } from "@nestjs/config";
import puppeteer from "puppeteer-extra";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

import {
  BROWSER_CONFIG,
  LISTS_TO_BLOCK_FROM,
  PUPPETEER_PROVIDER_FACTORY_TOKEN,
  USER_AGENT,
} from "./puppeteer.constants";

import type { ServerConfig } from "@syncreads/env";
import type { Page } from "puppeteer";

export type PuppeteerProviderFactory = Promise<Page>;

export const puppeteerProvider = {
  provide: PUPPETEER_PROVIDER_FACTORY_TOKEN,
  useFactory: async (configService: ConfigService<ServerConfig, true>) => {
    const browser = await puppeteer
      .use(StealthPlugin())
      .use(
        AdblockerPlugin({
          blockTrackers: true,
        }),
      )
      .launch({
        args: BROWSER_CONFIG,
        executablePath: configService.get<string>("CHROME_BIN"),
      });

    const blocker = await PuppeteerBlocker.fromLists(
      fetch,
      LISTS_TO_BLOCK_FROM,
    );

    const page = await browser.newPage();
    await blocker.enableBlockingInPage(page);
    await page.setUserAgent(USER_AGENT);

    return page;
  },
  inject: [ConfigService],
};
