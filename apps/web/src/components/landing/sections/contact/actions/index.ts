"use server";

import sgMail from "@sendgrid/mail";

import { env } from "@/lib/env/server";

import type { ContactInput } from "../form/validation";

sgMail.setApiKey(env.SENDGRID_API_KEY);

export const sendMail = async ({ name, email, message }: ContactInput) => {
  const msg: sgMail.MailDataRequired = {
    to: env.CONTACT_EMAIL,
    from: env.CONTACT_EMAIL,
    subject: `${name} - ${email}`,
    text: message,
  };

  await sgMail.send(msg);
};
