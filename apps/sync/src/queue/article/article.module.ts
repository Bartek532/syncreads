import { BullModule } from "@nestjs/bull";
import { Module, forwardRef } from "@nestjs/common";

import { UserModule } from "../../auth/user/user.module";
import { DeviceModule } from "../../device/device.module";
import { GeneratorModule } from "../../generator/generator.module";
import { SyncModule } from "../../sync/sync.module";

import { ARTICLE_QUEUE_TOKEN } from "./article.constants";
import { ArticleQueueConsumer } from "./article.consumer";
import { ArticleQueueService } from "./article.service";

@Module({
  imports: [
    BullModule.registerQueue({
      name: ARTICLE_QUEUE_TOKEN,
    }),
    UserModule,
    GeneratorModule,
    DeviceModule,
    forwardRef(() => SyncModule),
  ],
  providers: [ArticleQueueConsumer, ArticleQueueService],
  exports: [ArticleQueueService, BullModule],
})
export class ArticleQueueModule {}
