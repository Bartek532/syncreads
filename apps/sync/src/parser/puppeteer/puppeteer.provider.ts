import { ConfigService } from "@nestjs/config";
import puppeteer from "puppeteer-core";

import {
  BROWSER_CONFIG,
  PUPPETEER_PROVIDER_FACTORY_TOKEN,
} from "./puppeteer.constants";

import type { Configuration } from "../../types/configuration.schema";
import type { Page } from "puppeteer-core";

export type PuppeteerProviderFactory = Promise<Page>;

export const puppeteerProvider = {
  provide: PUPPETEER_PROVIDER_FACTORY_TOKEN,
  useFactory: async (configService: ConfigService<Configuration, true>) => {
    const browser = await puppeteer.launch({
      args: BROWSER_CONFIG,
      executablePath: configService.get<string>("CHROME_BIN"),
    });

    return browser.newPage();
  },
  inject: [ConfigService],
};
