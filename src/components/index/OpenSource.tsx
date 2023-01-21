import Link from "next/link";
import { memo } from "react";

import { INDEX_OPEN_SOURCE_HEADING } from "../../config";

import { SectionLayout } from "./section/SectionLayout";

export const OpenSource = memo(() => {
  return (
    <SectionLayout>
      <div className="w-full rounded-3xl bg-gradient-to-r from-indigo-500 via-red-500 to-blue-500 p-1 shadow-xl shadow-indigo-500/30">
        <div className="flex h-full w-full flex-col items-start justify-between gap-4 rounded-3xl bg-black py-12 px-8 xl:flex-row">
          <div>
            <h4 className="text-3xl font-bold text-slate-900 dark:text-white">
              {INDEX_OPEN_SOURCE_HEADING.title}
            </h4>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
              {INDEX_OPEN_SOURCE_HEADING.description}
            </p>
          </div>
          <Link
            className="z-10 mt-4 rounded-full bg-white/10 px-10 py-3 font-medium text-white no-underline transition hover:bg-white/20"
            href={INDEX_OPEN_SOURCE_HEADING.cta.href}
          >
            {INDEX_OPEN_SOURCE_HEADING.cta.text}
          </Link>
        </div>
      </div>
    </SectionLayout>
  );
});

OpenSource.displayName = "OpenSource";
