export enum HTTP_METHOD {
  CONNECT = "CONNECT",
  DELETE = "DELETE",
  GET = "GET",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
  TRACE = "TRACE",
}

export interface Login {
  readonly email: string;
  readonly password: string;
}

export interface Register {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

export type HeroIcon = (props: React.ComponentProps<"svg">) => JSX.Element;
export interface WebsiteDetails {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly url: string;
  readonly sitName: string;
  readonly mediaType: string;
  readonly contentType: string;
  readonly images: string[];
  readonly videos: string[];
  readonly favicons: string[];
}
