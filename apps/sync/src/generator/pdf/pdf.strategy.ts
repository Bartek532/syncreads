import { Inject, Injectable } from "@nestjs/common";

import {
  PDF_OPTIONS,
  PUPPETEER_PROVIDER_FACTORY_TOKEN,
} from "./puppeteer/puppeteer.constants";
import { PuppeteerProviderFactory } from "./puppeteer/puppeteer.provider";

import type { GeneratorStrategy } from "../generator.interface";
import type { Page } from "puppeteer-core";

@Injectable()
export class PdfStrategy implements GeneratorStrategy {
  constructor(
    @Inject(PUPPETEER_PROVIDER_FACTORY_TOKEN)
    private readonly puppeteerProvider: PuppeteerProviderFactory,
  ) {}

  async prepare(url: string) {
    const page = await this.puppeteerProvider;
    await page.goto(url, { waitUntil: "networkidle0" });

    const title = await page.title();

    return {
      title,
      generate: () => this.generate(page),
    };
  }

  async generate(page: Page) {
    const main = await page.$("main");

    if (main) {
      await page.evaluate((el) => {
        document.body.innerHTML = el.outerHTML;
      }, main);
    }

    const buffer = await page.pdf(PDF_OPTIONS);

    return {
      file: buffer,
    };
  }
}
