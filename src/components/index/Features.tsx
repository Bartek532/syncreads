import { memo } from "react";

import { FEATURES_CARDS, FEATURES_HEADING } from "../../config";

import { Card } from "./Card";
import { SectionHeading } from "./section/SectionHeading";
import { SectionLayout } from "./section/SectionLayout";

export const Features = memo(() => {
  return (
    <SectionLayout>
      <SectionHeading
        title={FEATURES_HEADING.title}
        description={FEATURES_HEADING.description}
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
