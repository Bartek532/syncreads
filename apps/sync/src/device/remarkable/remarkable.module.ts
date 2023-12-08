import { Module } from "@nestjs/common";

import { UserModule } from "../../auth/user/user.module";

import { RemarkableCacheService } from "./cache.service";
import { remarkableProvider } from "./remarkable.provider";
import { RemarkableStrategy } from "./remarkable.strategy";

@Module({
  imports: [UserModule],
  providers: [RemarkableStrategy, remarkableProvider, RemarkableCacheService],
  exports: [RemarkableStrategy, remarkableProvider],
})
export class DeviceRemarkableModule {}
