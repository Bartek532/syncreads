import { Module } from "@nestjs/common";

import { SyncController } from "./sync.controller";
import { SyncService } from "./sync.service";

@Module({
  imports: [],
  controllers: [SyncController],
  providers: [SyncService],
})
export class SyncModule {}
