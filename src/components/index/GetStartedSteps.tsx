import { memo } from "react";

import { GET_STARTED_HEADING, GET_STARTED_STEPS } from "../../config";

import { SectionHeading } from "./section/SectionHeading";
import { SectionLayout } from "./section/SectionLayout";

export const GetStartedSteps = memo(() => {
  return (
    <SectionLayout>
      <SectionHeading
        title={GET_STARTED_HEADING.title}
        description={GET_STARTED_HEADING.description}
      />

      <ul className="grid gap-4 md:gap-4 lg:grid-cols-3">
        {GET_STARTED_STEPS.map(({ index, title }) => (
          <li
            key={index}
            className="flex flex-row items-start justify-start gap-4 rounded-2xl bg-indigo-100 px-8 py-6 transition hover:bg-indigo-200/90 dark:bg-slate-900/90 dark:hover:bg-slate-900"
          >
            <strong className="text-2xl font-bold text-slate-900 dark:text-white">
              {index}.
            </strong>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {title}
            </p>
          </li>
        ))}
      </ul>
    </SectionLayout>
  );
});

GetStartedSteps.displayName = "GetStartedSteps";
