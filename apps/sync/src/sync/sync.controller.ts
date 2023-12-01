import { Controller, Get, Inject } from "@nestjs/common";

import { SUPABASE_CLIENT_FACTORY_TOKEN } from "../supabase/supabase.constants";
import { SupabaseProviderFactory } from "../supabase/supabase.provider";

@Controller()
export class SyncController {
  constructor(
    @Inject(SUPABASE_CLIENT_FACTORY_TOKEN)
    private readonly supabase: SupabaseProviderFactory,
  ) {}

  @Get()
  async getHello() {
    return this.supabase().from("Feed").select("*");
  }
}
