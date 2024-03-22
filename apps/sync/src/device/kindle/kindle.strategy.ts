import { Inject, Injectable } from "@nestjs/common";

import { EmailService } from "../../email/email.service";

import { KINDLE_CLIENT_FACTORY_TOKEN } from "./kindle.constants";
import { KindleProviderFactory } from "./kindle.provider";

import type { DeviceStrategy } from "../device.interface";
import type { OUTPUT_FORMAT } from "@rssmarkable/shared";

@Injectable()
export class KindleStrategy implements DeviceStrategy {
  constructor(
    @Inject(KINDLE_CLIENT_FACTORY_TOKEN)
    private readonly kindleProvider: KindleProviderFactory,
    private readonly emailService: EmailService,
  ) {}

  async upload({
    userId,
    title,
    file,
  }: {
    userId: string;
    title: string;
    file: {
      content: Buffer;
      type: OUTPUT_FORMAT;
    };
  }) {
    const email = await this.kindleProvider(userId);

    return this.emailService.sendEmail({
      to: email,
      subject: title,
      text: title,
      attachments: [
        {
          content: file.content.toString("base64"),
          filename: `${title}.${file.type}`,
          type: `application/${file.type}`,
          disposition: "attachment",
        },
      ],
    });
  }
}
