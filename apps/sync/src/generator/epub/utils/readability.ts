import { Readability as MozilaReadability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

export type Readability = NonNullable<
  ReturnType<MozilaReadability<Node>["parse"]>
>;

export const getReadibility = (url: string, html: string) => {
  const doc = new JSDOM(html, { url }).window.document;

  const res = new MozilaReadability<Node>(doc, {
    serializer: (v: Node) => v,
  }).parse();

  return res;
};
