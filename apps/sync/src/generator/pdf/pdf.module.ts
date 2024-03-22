import { Module } from "@nestjs/common";

import { PdfStrategy } from "./pdf.strategy";
import { puppeteerProvider } from "./puppeteer/puppeteer.provider";

@Module({
  providers: [PdfStrategy, puppeteerProvider],
  exports: [PdfStrategy],
})
export class GeneratorPdfModule {}
