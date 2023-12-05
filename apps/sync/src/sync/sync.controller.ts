import { Controller, Get } from "@nestjs/common";

@Controller()
export class SyncController {
  @Get()
  getHello() {
    return "hello";
  }
}
