import { Inject, Injectable } from "@nestjs/common";

import { EmailService } from "../../email/email.service";

import { KINDLE_CLIENT_FACTORY_TOKEN } from "./kindle.constants";
import { KindleProviderFactory } from "./kindle.provider";

import type { DeviceStrategy } from "../device.interface";

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
    pdf,
  }: {
    userId: string;
    title: string;
    pdf: Buffer;
  }) {
    const email = await this.kindleProvider(userId);

    return this.emailService.sendEmail({
      to: email,
      subject: title,
      text: title,
      attachments: [
        {
          content: pdf.toString("base64"),
          filename: `${title}.pdf`,
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    });
  }
}
