import {
  HOST,
  SITE_DESCRIPTION,
  SITE_IMAGE_URL,
  SITE_TITLE,
  SITE_TITLE_TEMPLATE,
} from "../config";

import type { Metadata, Viewport } from "next";

interface SeoProps {
  readonly title?: string;
  readonly description?: string;
  readonly image?: string;
}

export const DEFAULT_METADATA: Metadata = {
  title: {
    template: SITE_TITLE_TEMPLATE,
    default: SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
  robots: {
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    title: SITE_TITLE,
    locale: "en_EN",
    description: SITE_DESCRIPTION,
    images: {
      width: 1200,
      height: 880,
      alt: SITE_TITLE,
      url: `${HOST}${SITE_IMAGE_URL}`,
    },
    siteName: SITE_TITLE,
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
  themeColor: "#ffffff",
};

export const getMetadata = (
  {
    title = SITE_TITLE,
    description = SITE_DESCRIPTION,
    image = SITE_IMAGE_URL,
  } = {} as SeoProps,
): Metadata => ({
  title,
  description,
  openGraph: {
    title,
    locale: "en_EN",
    description,
    images: {
      width: 1200,
      height: 880,
      alt: title,
      url: `${HOST}${image}`,
    },
    siteName: SITE_TITLE,
  },
});
