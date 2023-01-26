import { INDEX_FEATURES_CARDS, INDEX_FEATURES_HEADING } from "../../config";

import { Card } from "./Card";
import { SectionHeading } from "./section/SectionHeading";
import { SectionLayout } from "./section/SectionLayout";

export const Features = () => {
  return (
    <SectionLayout>
      <SectionHeading
        title={INDEX_FEATURES_HEADING.title}
        description={INDEX_FEATURES_HEADING.description}
      />

      <div className="flex flex-col items-stretch justify-center gap-4 md:flex-row">
        {INDEX_FEATURES_CARDS.map((card) => (
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
};

Features.displayName = "Features";
