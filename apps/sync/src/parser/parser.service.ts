import { Inject } from "@nestjs/common";

import {
  PDF_OPTIONS,
  PUPPETEER_PROVIDER_FACTORY_TOKEN,
} from "./puppeteer/puppeteer.constants";
import { PuppeteerProviderFactory } from "./puppeteer/puppeteer.provider";
import { RSS_PARSER_PROVIDER_FACTORY_TOKEN } from "./rss/rss.constants";
import { RssParserProviderFactory } from "./rss/rss.provider";

import type { FeedArticle } from "./parser.types";

export class ParserService {
  constructor(
    @Inject(PUPPETEER_PROVIDER_FACTORY_TOKEN)
    private readonly puppeteerProvider: PuppeteerProviderFactory,
    @Inject(RSS_PARSER_PROVIDER_FACTORY_TOKEN)
    private readonly rssParserProvider: RssParserProviderFactory,
  ) {}

  async parseFeed(url: string) {
    const parsed = await this.rssParserProvider().parseURL(url);

    return parsed.items.filter(
      (item): item is FeedArticle => !!item.link && !!item.pubDate,
    );
  }

  async generatePdf(url: string) {
    const page = await this.puppeteerProvider();
    await page.goto(url, { waitUntil: "networkidle2" });

    return page.pdf(PDF_OPTIONS);
  }
}
