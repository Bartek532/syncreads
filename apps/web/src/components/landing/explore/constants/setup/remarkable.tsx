import Link from "next/link";

import { buttonVariants } from "../../../../ui/button";

export const REMARKABLE_SETUP_STEPS = [
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
          "/images/landing/integrations/remarkable/setup/create-account/light.png",
        dark: "/images/landing/integrations/remarkable/setup/create-account/dark.png",
      },
      width: 1200,
      height: 830,
    },
  },
  {
    id: "obtain-one-time-code",
    name: "Obtain one-time code",
    description:
      "Get a one-time code from your reMarkable account. It will be used to link your device with SyncReads.",
    actions: [
      <a
        href="https://my.remarkable.com/device/browser/connect"
        rel="noopener noreferrer"
        className={buttonVariants()}
        key="get-code"
        target="blank"
      >
        Get code
      </a>,
      <Link
        href="/dashboard/device"
        className={buttonVariants({ variant: "outline" })}
        key="already-have-code"
        target="blank"
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
    id: "register-device",
    name: "Register device",
    description:
      "Login to dashboard and register your device using obtained one-time code. That's really simple!",
    actions: [
      <Link
        href="/dashboard/device"
        className={buttonVariants()}
        key="register"
        target="blank"
      >
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
    id: "sync",
    name: "Sync!",
    description:
      "That's it! Your reMarkable is now connected to SyncReads. Enjoy full power of the internet, happy syncing!",
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
