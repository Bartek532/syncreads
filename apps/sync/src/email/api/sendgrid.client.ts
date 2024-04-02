import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Sendgrid from "@sendgrid/mail";

import type { ServerConfig } from "@syncreads/shared";
import type { MailDataRequired } from "@sendgrid/mail";

@Injectable()
export class SendgridClient {
  constructor(
    private readonly configService: ConfigService<ServerConfig, true>,
  ) {
    Sendgrid.setApiKey(this.configService.get("SENDGRID_API_KEY"));
  }

  async send(mail: MailDataRequired) {
    return Sendgrid.send(mail);
  }
}
