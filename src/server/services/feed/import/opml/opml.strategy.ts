import { XMLParser } from "fast-xml-parser";

import { isURL } from "../../../../../utils/validation/validator";

export const parse = (content: string) => {
  try {
    const urls: string[] = [];
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeValueProcessor: (name, value) => {
        if (name === "xmlUrl" && isURL(value)) {
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
