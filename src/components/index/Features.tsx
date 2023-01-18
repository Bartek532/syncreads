import { memo } from "react";

import { Card } from "./Card";
import { SectionHeading } from "./SectionHeading";
import { SectionLayout } from "./SectionLayout";

const FEATURES_CARDS = [
  {
    title: "Seamless Syncing",
    description:
      "Automatically sync your favorite RSS feeds to your Remarkable tablet",
    className:
      "bg-gradient bg-gradient-to-bl from-indigo-400/10 to-indigo-500/30",
  },
  {
    title: "Add any RSS feed",
    description:
      "Any RSS feed can be synced to your Remarkable tablet. No restrictions",
    className:
      "bg-gradient bg-gradient-to-bl from-indigo-400/5 to-indigo-500/20",
  },
];

export const Features = memo(() => {
  return (
    <SectionLayout>
      <SectionHeading
        title="Features"
        description="RSSMarkable is a free service that allows you to sync your Remarkable feeds"
      />

      <div className="flex flex-col items-stretch justify-center gap-4 md:flex-row">
        {FEATURES_CARDS.map((card) => (
          <Card
            key={card.title}
            title={card.title}
            description={card.description}
            className={card.className}
          />
        ))}
      </div>
    </SectionLayout>
  );
});

Features.displayName = "Features";
