import { Injectable } from "@nestjs/common";
import { render } from "teapub";
import xmlserializer from "xmlserializer";

import { css } from "./constants/css";
import { fetchImage } from "./utils/images";
import { getReadibility } from "./utils/readability";
import { Walker } from "./utils/walker";

import type { Readability } from "./utils/readability";
import type { GeneratorStrategy } from "../generator.interface";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
@Injectable()
export class EpubStrategy implements GeneratorStrategy {
  async prepare(url: string) {
    const response = await fetch(url);
    const html = await response.text();

    const readability = getReadibility(url, html);

    if (!readability) {
      throw new Error("No content found!");
    }

    return {
      title: readability.title,
      generate: () => this.generate(url, readability),
    };
  }

  async generate(url: string, readability: Readability) {
    const { content, images } = new Walker().walk(readability.content);

    // @ts-expect-error - types are wrong
    const serialized = xmlserializer.serializeToString(content[0]);
    const imageBuffers = await Promise.all(
      Array.from(images).map(async (image) => {
        const { buffer, type } = await fetchImage(image);
        return [image, { data: buffer, mime: type }] as const;
      }),
    );

    await sleep(5000);

    const buffer = await render({
      title: readability.title,
      author: readability.byline,
      sections: [
        {
          title: readability.title,
          content: `<a href="${url}">${url}</a><h1>${readability.title}</h1>${serialized}`,
        },
      ],
      missingImage: "remove",
      images: new Map(imageBuffers),
      css,
    });

    return {
      file: Buffer.from(buffer),
    };
  }
}
