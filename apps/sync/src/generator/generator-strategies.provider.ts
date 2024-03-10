import { OUTPUT_FORMAT } from "@rssmarkable/shared";

import { EpubStrategy } from "./epub/epub.strategy";
import { GENERATOR_STRATEGIES_TOKEN } from "./generator.constants";
import { PdfStrategy } from "./pdf/pdf.strategy";

import type { GeneratorStrategy } from "./generator.interface";

export type GeneratorStrategiesProviderFactory = Record<
  OUTPUT_FORMAT,
  GeneratorStrategy
>;

export const generatorStrategiesProvider = {
  provide: GENERATOR_STRATEGIES_TOKEN,
  useFactory: (
    pdfStrategy: PdfStrategy,
    epubStrategy: EpubStrategy,
  ): Record<OUTPUT_FORMAT, GeneratorStrategy> => {
    return {
      [OUTPUT_FORMAT.PDF]: pdfStrategy,
      [OUTPUT_FORMAT.EPUB]: epubStrategy,
    };
  },
  inject: [PdfStrategy, EpubStrategy],
};
