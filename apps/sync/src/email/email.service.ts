import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { SendgridClient } from "./api/sendgrid.client";

import type { Attachment } from "./types/email.types";
import type { ServerConfig } from "@rssmarkable/shared";

@Injectable()
export class EmailService {
  constructor(
    private readonly sendGridClient: SendgridClient,
    private readonly configService: ConfigService<ServerConfig, true>,
  ) {}

  async sendEmail({
    to,
    subject,
    text,
    attachments,
  }: {
    to: string;
    subject: string;
    text: string;
    attachments?: Attachment[];
  }) {
    const mail = {
      to,
      from: this.configService.get("EMAIL"),
      subject,
      text,
      ...(attachments ? { attachments } : {}),
    };
    await this.sendGridClient.send(mail);
  }
}
