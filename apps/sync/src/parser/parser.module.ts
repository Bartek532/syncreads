import { Module } from "@nestjs/common";

import { puppeteerProvider } from "./puppeteer/puppeteer.provider";
import { rssParserProvider } from "./rss/rss.provider";

@Module({
  providers: [puppeteerProvider, rssParserProvider],
  exports: [puppeteerProvider, rssParserProvider],
})
export class ParserModule {}
