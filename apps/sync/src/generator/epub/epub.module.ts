import { Module } from "@nestjs/common";

import { EpubStrategy } from "./epub.strategy";

@Module({
  providers: [EpubStrategy],
  exports: [EpubStrategy],
})
export class GeneratorEpubModule {}
