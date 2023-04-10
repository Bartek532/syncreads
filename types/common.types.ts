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

export type HeroIcon = (
  props: React.ComponentProps<"svg">,
) => JSX.Element | null;
