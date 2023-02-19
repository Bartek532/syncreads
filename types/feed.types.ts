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
  readonly title: string;
  readonly description?: string;
  readonly link?: string;
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
