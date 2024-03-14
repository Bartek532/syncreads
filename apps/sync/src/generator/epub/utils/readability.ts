import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

export const getReadibility = (url: string, html: string) => {
  const doc = new JSDOM(html, { url }).window.document;

  const res = new Readability<Node>(doc, {
    serializer: (v: Node) => v,
  }).parse();

  return res;
};
