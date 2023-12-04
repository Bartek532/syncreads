import { Controller, Get } from "@nestjs/common";

import { ParserService } from "../parser/parser.service";

@Controller()
export class SyncController {
  constructor(private readonly parserService: ParserService) {}

  @Get()
  async getHello() {
    return this.parserService.parseFeed("https://www.zagrodzki.me/feed");
  }
}
