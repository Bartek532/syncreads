import { NextSeo } from "next-seo";

import { APP_NAME } from "../../utils/constants";

type SeoProps = Readonly<{
  title?: string;
  description?: string;
}>;

const titleSuffix = ` • ${APP_NAME}`;

export const Seo = ({
  title = "",
  description = "RSSmarkable.com - Sync all of your favourite RSS feeds directly to your Remarkable tablet with just a few clicks.",
}: SeoProps) => {
  const formattedTitle = title.trim() ? `${title}${titleSuffix}` : APP_NAME;

  return (
    <NextSeo
      title={formattedTitle}
      description={description}
      openGraph={{
        type: "website",
        siteName: "RSSmarkable.com",
        locale: "en_US",
        // TODO: add image
      }}
    />
  );
};
