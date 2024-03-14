import { Injectable } from "@nestjs/common";
import { render } from "teapub";
import xmlserializer from "xmlserializer";

import { css } from "./constants/css";
import { getReadibility } from "./utils/readability";

import type { GeneratorStrategy } from "../generator.interface";

@Injectable()
export class EpubStrategy implements GeneratorStrategy {
  async generate(url: string) {
    const response = await fetch(url);
    const html = await response.text();

    const readability = getReadibility(url, html);

    if (!readability) {
      throw new Error("No content found!");
    }

    // @ts-expect-error
    const content = xmlserializer.serializeToString(readability.content);

    console.log("ressss", content, readability);
    const buffer = await render({
      title: readability.title,
      author: readability.byline,
      sections: [
        {
          title: readability.title,
          content: `<a href="${url}">${url}</a><h1>${readability.title}</h1>${content}`,
        },
      ],
      missingImage: "remove",
      css,
    });

    return Buffer.from(buffer);
  }
}
