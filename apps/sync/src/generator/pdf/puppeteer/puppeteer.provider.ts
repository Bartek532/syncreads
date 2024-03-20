import { PuppeteerBlocker } from "@cliqz/adblocker-puppeteer";
import { ConfigService } from "@nestjs/config";
import puppeteer from "puppeteer-core";

import {
  BROWSER_CONFIG,
  PUPPETEER_PROVIDER_FACTORY_TOKEN,
} from "./puppeteer.constants";

import type { ServerConfig } from "@rssmarkable/shared";
import type { Page } from "puppeteer-core";

const LISTS_TO_BLOCK_FROM = [
  "https://secure.fanboy.co.nz/fanboy-cookiemonster.txt",
  "https://easylist.to/easylist/easylist.txt",
];

// const COOKIE_BOT_URL = "https://cookiebot.com/";

export type PuppeteerProviderFactory = Promise<Page>;

export const puppeteerProvider = {
  provide: PUPPETEER_PROVIDER_FACTORY_TOKEN,
  useFactory: async (configService: ConfigService<ServerConfig, true>) => {
    const browser = await puppeteer.launch({
      args: BROWSER_CONFIG,
      executablePath: configService.get<string>("CHROME_BIN"),
    });

    const blocker = await PuppeteerBlocker.fromLists(
      fetch,
      LISTS_TO_BLOCK_FROM,
    );

    const page = await browser.newPage();
    // @ts-expect-error - Differs from the "puppeteer" package
    await blocker.enableBlockingInPage(page);

    return page;
  },
  inject: [ConfigService],
};
