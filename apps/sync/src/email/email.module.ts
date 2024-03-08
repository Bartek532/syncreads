import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { SendgridClient } from "./api/sendgrid.client";
import { EmailService } from "./email.service";

@Module({
  imports: [ConfigModule],
  providers: [EmailService, SendgridClient],
  exports: [EmailService],
})
export class EmailModule {}
