import { Controller, Get } from "@nestjs/common";
import { supabase } from "@rssmarkable/database";

import { SyncService } from "./sync.service";

@Controller()
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Get()
  async getHello() {
    const { data } = await supabase.from("Feed").select("*");

    console.log(data);
    return this.syncService.getHello();
  }
}
