import Parser from "rss-parser";

const parser = new Parser();

export const parseFeed = async (url: string) => {
  return parser.parseURL(url);
};
