import Parser from "rss-parser";

import { RSS_PARSER_PROVIDER_FACTORY_TOKEN } from "./rss.constants";

export type RssParserProviderFactory = Parser;

export const rssParserProvider = {
  provide: RSS_PARSER_PROVIDER_FACTORY_TOKEN,
  useClass: Parser,
};
