import { Inject, Injectable } from "@nestjs/common";

import { RSS_PARSER_PROVIDER_FACTORY_TOKEN } from "./rss/rss.constants";
import { RssParserProviderFactory } from "./rss/rss.provider";

import type { FeedArticle } from "./parser.types";

@Injectable()
export class ParserService {
  constructor(
    @Inject(RSS_PARSER_PROVIDER_FACTORY_TOKEN)
    private readonly rssParserProvider: RssParserProviderFactory,
  ) {}

  async parseFeed(url: string) {
    const parsed = await this.rssParserProvider.parseURL(url);

    return parsed.items.filter(
      (item): item is FeedArticle => !!item.link && !!item.pubDate,
    );
  }
}
