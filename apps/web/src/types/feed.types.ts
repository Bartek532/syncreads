export interface LinkPreview {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly url: string;
  readonly siteName: string;
  readonly mediaType: string;
  readonly contentType: string;
  readonly images: string[];
  readonly videos: string[];
  readonly favicons: string[];
}

export interface FeedItemApi {
  readonly title?: string;
  readonly description?: string;
  readonly link: string;
  readonly published: number;
}

export interface FeedApi {
  readonly title: string | { $text: string; type: string };
  readonly description?: string;
  readonly link?:
    | string
    | { href: string; rel: string; type?: string; hreflang?: string }[];
  readonly image?: string;
  readonly items: FeedItemApi[];
}

export interface WebsiteDetails {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly url: string;
}

export interface FeedArticle {
  readonly link: string;
  readonly pubDate: string;
  readonly title?: string;
}

export interface FeedWithArticles {
  readonly url: string;
  readonly articles: FeedArticle[];
}

export interface UrlMetadata {
  readonly url: string;
  readonly title?: string;
  readonly description?: string;
  readonly image?: string;
  readonly "og:image"?: string;
  readonly favicons?: { href: string }[];
}

export enum FILE_TYPE {
  OPML = "opml",
}
