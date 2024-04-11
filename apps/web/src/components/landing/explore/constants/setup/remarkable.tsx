import Link from "next/link";

import { buttonVariants } from "../../../../ui/button";

export const REMARKABLE_SETUP_STEPS = [
  {
    name: "Create account",
    description: "Sign up for an account on our website. It's free!",
    actions: [
      <Link href="/auth/register" className={buttonVariants()} key="start-now">
        Start now!
      </Link>,
    ],
    image: {
      src: {
        light:
          "/images/landing/integrations/remarkable/setup/create-account/light.png",
        dark: "/images/landing/integrations/remarkable/setup/create-account/dark.png",
      },
      width: 1200,
      height: 830,
    },
  },
  {
    name: "Obtain one-time code",
    description:
      "Get a one-time code from your reMarkable account. It will be used to link your device with SyncReads.",
    actions: [
      <Link
        href="https://my.remarkable.com/device/browser/connect"
        className={buttonVariants()}
        key="get-code"
      >
        Get code
      </Link>,
      <Link
        href="/dashboard/device"
        className={buttonVariants({ variant: "outline" })}
        key="already-have-code"
      >
        I have code!
      </Link>,
    ],
    image: {
      src: {
        light:
          "/images/landing/integrations/remarkable/setup/one-time-code/light.png",
        dark: "/images/landing/integrations/remarkable/setup/one-time-code/dark.png",
      },
      width: 1200,
      height: 830,
    },
  },
  {
    name: "Register device",
    description:
      "Login to dashboard and register your device using the one-time code. That's really simple!",
    actions: [
      <Link href="/dashboar/device" className={buttonVariants()} key="register">
        Go to dashboard
      </Link>,
    ],
    image: {
      src: {
        light:
          "/images/landing/integrations/remarkable/setup/register/light.png",
        dark: "/images/landing/integrations/remarkable/setup/register/dark.png",
      },
      width: 800,
      height: 600,
    },
  },
  {
    name: "Sync!",
    description:
      "That's it! Your reMarkable is now connected to SyncReads. Enjoy full power of the internet, happy syncing!",
    actions: [],
    image: {
      src: {
        light: "/images/landing/integrations/remarkable/setup/sync/light.png",
        dark: "/images/landing/integrations/remarkable/setup/sync/dark.png",
      },
      width: 1000,
      height: 700,
    },
  },
];
