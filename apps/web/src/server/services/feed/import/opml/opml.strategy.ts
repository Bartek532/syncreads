import { XMLParser } from "fast-xml-parser";
import { z } from "zod";

export const parse = (content: string) => {
  try {
    const urls: string[] = [];
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeValueProcessor: (name, value) => {
        if (name === "xmlUrl" && z.string().url().safeParse(value).success) {
          urls.push(value);
        }
      },
    });

    parser.parse(content);

    return urls;
  } catch (err) {
    return [];
  }
};

export const opmlStrategy = { parse } as const;
