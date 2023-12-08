import { Module } from "@nestjs/common";

import { SupabaseModule } from "../../supabase/supabase.module";

import { UserService } from "./user.service";

@Module({
  imports: [SupabaseModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
