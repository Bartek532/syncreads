import { Module } from "@nestjs/common";

import { GeneratorEpubModule } from "./epub/epub.module";
import { generatorStrategiesProvider } from "./generator-strategies.provider";
import { GeneratorPdfModule } from "./pdf/pdf.module";

@Module({
  imports: [GeneratorPdfModule, GeneratorEpubModule],
  providers: [generatorStrategiesProvider],
  exports: [generatorStrategiesProvider],
})
export class GeneratorModule {}
