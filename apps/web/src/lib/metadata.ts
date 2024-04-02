import { APP_DESCRIPTION, APP_NAME } from "@syncreads/shared";

import { URL, APP_IMAGE, APP_NAME_TEMPLATE } from "../config";

import type { Metadata, Viewport } from "next";

interface SeoProps {
  readonly title?: string;
  readonly description?: string;
  readonly image?: string;
}

export const DEFAULT_METADATA: Metadata = {
  title: {
    template: APP_NAME_TEMPLATE,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  robots: {
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  manifest: "/APP.webmanifest",
  openGraph: {
    type: "website",
    title: APP_NAME,
    locale: "en_EN",
    description: APP_DESCRIPTION,
    images: {
      width: 2717,
      height: 2038,
      alt: APP_NAME,
      url: `${URL}${APP_IMAGE.light}`,
    },
    siteName: APP_NAME,
  },
  icons: {
    icon: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#ffffff",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/apple-touch-icon.png",
      },
    ],
  },
};

export const DEFAULT_VIEWPORT: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

export const getMetadata = (
  {
    title = APP_NAME,
    description = APP_DESCRIPTION,
    image = APP_IMAGE.light,
  } = {} as SeoProps,
): Metadata => ({
  title,
  description,
  openGraph: {
    title,
    locale: "en_EN",
    description,
    images: {
      width: 2717,
      height: 2038,
      alt: title,
      url: `${URL}${image}`,
    },
    siteName: APP_NAME,
  },
});
