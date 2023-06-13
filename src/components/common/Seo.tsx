import { NextSeo } from "next-seo";

import { APP_NAME, APP_DESCRIPTION } from "../../config";

type SeoProps = Readonly<{
  title?: string;
  description?: string;
}>;

const titleSuffix = ` • ${APP_NAME}`;

export const Seo = ({
  title = "",
  description = APP_DESCRIPTION,
}: SeoProps) => {
  const formattedTitle = title.trim() ? `${title}${titleSuffix}` : APP_NAME;

  return (
    <NextSeo
      title={formattedTitle}
      description={description}
      openGraph={{
        type: "website",
        siteName: APP_NAME,
        locale: "en_US",
        // TODO: add image
      }}
    />
  );
};
