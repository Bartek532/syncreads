import { HTTP_STATUS_CODE } from "@rssmarkable/shared";

export const isFeedUrl = async (url: string) => {
  const response = await fetch(url);

  return (
    response.status === HTTP_STATUS_CODE.OK &&
    response.headers.get("content-type")?.includes("xml")
  );
};
