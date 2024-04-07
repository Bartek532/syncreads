import { BullModule } from "@nestjs/bull";
import { Module, forwardRef } from "@nestjs/common";

import { UserModule } from "../../auth/user/user.module";
import { DeviceModule } from "../../device/device.module";
import { GeneratorModule } from "../../generator/generator.module";
import { ParserModule } from "../../parser/parser.module";
import { SyncModule } from "../../sync/sync.module";
import { ArticleQueueService } from "../article/article.service";

import { FEED_QUEUE_TOKEN } from "./feed.constants";
import { FeedQueueConsumer } from "./feed.consumer";

@Module({
  imports: [
    BullModule.registerQueue({
      name: FEED_QUEUE_TOKEN,
    }),
    GeneratorModule,
    DeviceModule,
    ParserModule,
    forwardRef(() => SyncModule),
    UserModule,
  ],
  providers: [ArticleQueueService, FeedQueueConsumer],
  exports: [BullModule],
})
export class FeedQueueModule {}
