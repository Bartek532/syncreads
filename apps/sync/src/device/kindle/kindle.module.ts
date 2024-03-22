import { Module } from "@nestjs/common";

import { UserModule } from "../../auth/user/user.module";
import { EmailModule } from "../../email/email.module";

import { kindleProvider } from "./kindle.provider";
import { KindleStrategy } from "./kindle.strategy";

@Module({
  imports: [UserModule, EmailModule],
  providers: [KindleStrategy, kindleProvider],
  exports: [KindleStrategy, kindleProvider],
})
export class DeviceKindleModule {}
