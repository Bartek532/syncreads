import { NextSeo } from "next-seo";
import Head from "next/head";

type SeoProps = Readonly<{
  title?: string;
  description?: string;
}>;

const titleSuffix = " • RSSmarkable.com";

export const Seo = ({
  title = "",
  description = "RSSmarkable.com - Sync all of your favourite RSS feeds directly to your Remarkable tablet with just a few clicks.",
}: SeoProps) => {
  const formattedTitle = title.trim()
    ? `${title}${titleSuffix}`
    : "RSSmarkable.com";

  return (
    <>
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
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};
