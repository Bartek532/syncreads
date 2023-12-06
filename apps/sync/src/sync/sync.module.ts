import { Module, forwardRef } from "@nestjs/common";

import { UserModule } from "../auth/user/user.module";
import { ArticleQueueModule } from "../queue/article/article.module";
import { SupabaseModule } from "../supabase/supabase.module";

import { SyncController } from "./sync.controller";
import { SyncService } from "./sync.service";

@Module({
  imports: [SupabaseModule, UserModule, forwardRef(() => ArticleQueueModule)],
  providers: [SyncService],
  controllers: [SyncController],
  exports: [SyncService],
})
export class SyncModule {}
