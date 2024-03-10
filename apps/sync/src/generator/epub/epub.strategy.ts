import { Injectable } from "@nestjs/common";
import { load } from "cheerio";
import { render } from "teapub";

import type { GeneratorStrategy } from "../generator.interface";
import type { Section } from "teapub";

@Injectable()
export class EpubStrategy implements GeneratorStrategy {
  async generate(url: string) {
    const response = await fetch(url);
    const html = await response.text();

    const $ = load(html);

    const data: Section[] = [];
    $("h1, h2, h3, h4, h5, h6").each((_, element) => {
      const heading = $(element).text();
      const content = $(element).nextUntil("h1, h2, h3, h4, h5, h6").text();
      data.push({ title: heading, content: content });
    });

    console.log(data);
    const buffer = await render({
      title: "title",
      sections: data,
    });

    return Buffer.from(buffer);
  }
}
