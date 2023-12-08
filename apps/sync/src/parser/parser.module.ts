import { Module } from "@nestjs/common";

import { ParserService } from "./parser.service";
import { puppeteerProvider } from "./puppeteer/puppeteer.provider";
import { rssParserProvider } from "./rss/rss.provider";

@Module({
  providers: [puppeteerProvider, rssParserProvider, ParserService],
  exports: [puppeteerProvider, rssParserProvider, ParserService],
})
export class ParserModule {}
