import Parser from "rss-parser";

import type { UrlMetadata } from "@/types/feed.types";

const parser = new Parser();

export const parseFeedFromUrl = async (url: string) => {
  return parser.parseURL(url);
};

export const parseFeedFromString = async (xml: string) => {
  return parser.parseString(xml);
};

export const getFavicon = (
  originalUrl: string,
  favicons: UrlMetadata["favicons"],
) => {
  if (!favicons) {
    return null;
  }

  try {
    const url = new URL(originalUrl);

    for (const favicon of favicons) {
      if (favicon.href.startsWith("http")) {
        return favicon.href;
      }

      if (favicon.href.startsWith("/")) {
        return `${url.origin}${favicon.href}`;
      }

      return null;
    }

    return null;
  } catch {
    return null;
  }
};
