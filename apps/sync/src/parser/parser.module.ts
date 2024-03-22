import { Module } from "@nestjs/common";

import { ParserService } from "./parser.service";
import { rssParserProvider } from "./rss/rss.provider";

@Module({
  providers: [rssParserProvider, ParserService],
  exports: [rssParserProvider, ParserService],
})
export class ParserModule {}
