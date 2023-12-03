import { Module } from "@nestjs/common";

import { SupabaseModule } from "../supabase/supabase.module";

import { remarkableProvider } from "./remarkable.provider";
import { RemarkableStrategy } from "./remarkable.strategy";

@Module({
  imports: [SupabaseModule],
  providers: [RemarkableStrategy, remarkableProvider],
  exports: [RemarkableStrategy, remarkableProvider],
})
export class DeviceRemarkableModule {}
