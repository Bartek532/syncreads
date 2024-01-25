import { Module, forwardRef } from "@nestjs/common";

import { UserModule } from "../auth/user/user.module";
import { ArticleQueueModule } from "../queue/article/article.module";
import { FeedQueueModule } from "../queue/feed/feed.module";
import { SupabaseModule } from "../supabase/supabase.module";

import { SyncLoggerModule } from "./logger/logger.module";
import { SyncController } from "./sync.controller";
import { SyncService } from "./sync.service";

@Module({
  imports: [
    SupabaseModule,
    UserModule,
    SyncLoggerModule,
    forwardRef(() => ArticleQueueModule),
    forwardRef(() => FeedQueueModule),
  ],
  providers: [SyncService],
  controllers: [SyncController],
  exports: [SyncService, SyncLoggerModule],
})
export class SyncModule {}
