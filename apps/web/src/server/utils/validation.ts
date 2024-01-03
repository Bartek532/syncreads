import { HTTP_STATUS_CODE } from "@rssmarkable/shared";

export const isFeedUrl = async (url: string) => {
  const response = await fetch(url);

  const data = await response.text();

  return {
    isFeed:
      response.status === HTTP_STATUS_CODE.OK &&
      response.headers.get("content-type")?.includes("xml"),
    response: {
      headers: Object.fromEntries(new Headers(response.headers).entries()),
      url,
      data,
    },
  };
};
