import { memo } from "react";

import { SectionHeading } from "./SectionHeading";
import { SectionLayout } from "./SectionLayout";

const GET_STARTED_STEPS = [
  "Create an account. It's free!",
  "Connect your Remarkable account",
  "Add your RSS feeds",
];

export const GetStartedSteps = memo(() => {
  return (
    <SectionLayout>
      <SectionHeading
        title="Steps to get started"
        description="Syncing your feeds is as easy as 1, 2, 3"
      />

      <ul className="grid gap-4 md:gap-4 lg:grid-cols-3">
        {GET_STARTED_STEPS.map((item, index) => (
          <li
            key={item}
            className="flex flex-row items-start justify-start gap-4 rounded-2xl bg-indigo-100 px-8 py-6 transition hover:bg-indigo-200/90 dark:bg-slate-900/90 dark:hover:bg-slate-900"
          >
            <strong className="text-2xl font-bold text-slate-900 dark:text-white">
              {index + 1}.
            </strong>
            <p className="text-lg text-slate-600 dark:text-slate-400">{item}</p>
          </li>
        ))}
      </ul>
    </SectionLayout>
  );
});

GetStartedSteps.displayName = "GetStartedSteps";
