import { Injectable } from "@nestjs/common";
import { render } from "teapub";
import xmlserializer from "xmlserializer";

import { fetcher } from "../../utils/fetcher";

import { css, IMAGE_SUPPORTED_FORMATS } from "./epub.constants";
import { fetchImage } from "./utils/images";
import { getReadibility } from "./utils/readability";
import { Walker } from "./utils/walker";

import type { Readability } from "./utils/readability";
import type { GeneratorStrategy } from "../generator.interface";

@Injectable()
export class EpubStrategy implements GeneratorStrategy {
  async prepare(url: string) {
    const response = await fetcher(url, {
      credentials: "include",
    });

    // read cookies
    const cookies = response.headers.get("set-cookie");
    console.log("Cookies", cookies);

    const xd = response.headers.keys();
    console.log("Headers", xd);

    const html = await response.text();

    const readability = getReadibility(url, html);

    if (!readability) {
      throw new Error(
        "Sorry, we don't provide support for this page yet with EPUB, maybe try a PDF?",
      );
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

    const filteredUnsupportedImages = imageBuffers.filter(
      ([, { mime }]) => mime && IMAGE_SUPPORTED_FORMATS.includes(mime),
    );

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
      images: new Map(filteredUnsupportedImages),
      css,
    });

    return {
      file: Buffer.from(buffer),
    };
  }
}
