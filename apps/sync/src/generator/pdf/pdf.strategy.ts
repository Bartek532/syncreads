import { Inject, Injectable } from "@nestjs/common";

import {
  PDF_OPTIONS,
  PUPPETEER_PROVIDER_FACTORY_TOKEN,
} from "./puppeteer/puppeteer.constants";
import { PuppeteerProviderFactory } from "./puppeteer/puppeteer.provider";

import type { GeneratorStrategy } from "../generator.interface";

@Injectable()
export class PdfStrategy implements GeneratorStrategy {
  constructor(
    @Inject(PUPPETEER_PROVIDER_FACTORY_TOKEN)
    private readonly puppeteerProvider: PuppeteerProviderFactory,
  ) {}

  async generate(url: string) {
    const page = await this.puppeteerProvider;
    await page.goto(url, { waitUntil: "networkidle0" });

    const main = await page.$("main");
    await page.evaluate((el) => {
      document.body.innerHTML = el?.outerHTML || "";
    }, main);

    console.log("pdf");

    return page.pdf(PDF_OPTIONS);
  }
}
