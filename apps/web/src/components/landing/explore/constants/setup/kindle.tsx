import Link from "next/link";

import { buttonVariants } from "../../../../ui/button";
import { Copy } from "../../../../ui/copy";

const KINDLE_APPROVED_EMAIL = "hello@syncreads.com";

export const KINDLE_SETUP_STEPS = [
  {
    id: "create-account",
    name: "Create account",
    description:
      "It's the simplest step as it's totally free and shouldn't take more than few seconds to complete!",
    actions: [
      <Link
        href="/auth/register"
        className={buttonVariants()}
        key="start-now"
        target="blank"
      >
        Start now!
      </Link>,
    ],
    image: {
      src: {
        light:
          "/images/landing/integrations/kindle/setup/create-account/light.png",
        dark: "/images/landing/integrations/kindle/setup/create-account/dark.png",
      },
      width: 1200,
      height: 830,
    },
  },
  {
    id: "obtain-email",
    name: "Obtain Kindle email",
    description: (
      <>
        Every Kindle has a dedicated email address, that can be used to send
        files to it. You can find it in your Amazon profile - it ends with{" "}
        <i>@kindle.com</i>. <br /> <br /> Go to{" "}
        <a
          href="https://www.amazon.com/hz/mycd/digital-console/contentlist/pdocs/dateDsc"
          className="underline hover:no-underline"
          target="blank"
          rel="noopener noreferrer"
        >
          Manage Your Content & Devices
        </a>{" "}
        &gt; Preferences &gt; Personal Document Settings.
      </>
    ),
    actions: [
      <a
        href="https://www.amazon.com/hz/mycd/digital-console/alldevices?pageType=devices&ref_=ya_d_l_manage_devices"
        className={buttonVariants()}
        key="get-email"
        rel="noopener noreferrer"
        target="blank"
      >
        Get email
      </a>,
      <a
        href="https://www.amazon.com/sendtokindle/email"
        className={buttonVariants({ variant: "outline" })}
        key="cannot-find-email"
        target="blank"
        rel="noopener noreferrer"
      >
        I can&apos;t find it
      </a>,
    ],
    image: {
      src: {
        light:
          "/images/landing/integrations/kindle/setup/obtain-email/light.png",
        dark: "/images/landing/integrations/kindle/setup/obtain-email/dark.png",
      },
      width: 1564,
      height: 1200,
    },
  },
  {
    id: "add-approved-email",
    name: "Add approved email",
    description: (
      <>
        Only approved emails can send files to your Kindle. You need to add
        SyncReads email to the list.
        <div
          key="copy-email"
          className="my-4 flex w-fit items-center gap-4 rounded-md border border-dashed border-input py-1.5 pl-4 pr-2 text-sm"
        >
          <span>{KINDLE_APPROVED_EMAIL}</span>
          <Copy text={KINDLE_APPROVED_EMAIL} />
        </div>
        It&apos;s safe, we won&apos;t use it for anything else than syncing.
        <br /> <br /> Go to{" "}
        <a
          href="https://www.amazon.com/hz/mycd/digital-console/contentlist/pdocs/dateDsc"
          className="underline hover:no-underline"
          rel="noopener noreferrer"
          target="blank"
        >
          Manage Your Content & Devices
        </a>{" "}
        &gt; Preferences &gt; Personal Document Settings &gt; Approved Personal
        Document E-mail List
      </>
    ),
    actions: [
      <a
        href="https://www.amazon.com/hz/mycd/myx#/home/settings/payment"
        className={buttonVariants()}
        key="register"
        rel="noopener noreferrer"
        target="blank"
      >
        Add email
      </a>,
      <a
        key="need-help"
        href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GX9XLEVV8G4DB28H"
        className={buttonVariants({ variant: "outline" })}
        rel="noopener noreferrer"
        target="blank"
      >
        I need help
      </a>,
    ],
    image: {
      src: {
        light:
          "/images/landing/integrations/kindle/setup/approved-email/light.png",
        dark: "/images/landing/integrations/kindle/setup/approved-email/dark.png",
      },
      width: 1590,
      height: 1200,
    },
  },
  {
    id: "register-device",
    name: "Register device",
    description: (
      <>
        Login to dashboard and register your device using your Kindle email
        (ends with <i>@kindle.com</i>). That&apos;s really simple!
      </>
    ),
    actions: [
      <Link
        href="/dashboard/device"
        className={buttonVariants()}
        key="register"
      >
        Go to dashboard
      </Link>,
    ],
    image: {
      src: {
        light: "/images/landing/integrations/kindle/setup/register/light.png",
        dark: "/images/landing/integrations/kindle/setup/register/dark.png",
      },
      width: 1600,
      height: 1200,
    },
  },
  {
    id: "sync",
    name: "Sync!",
    description:
      "That's it! Your Kindle is now connected to SyncReads. Enjoy full power of the internet, happy syncing!",
    image: {
      src: {
        light: "/images/landing/integrations/kindle/setup/sync/light.png",
        dark: "/images/landing/integrations/kindle/setup/sync/dark.png",
      },
      width: 1000,
      height: 700,
    },
  },
];
