import Link from "next/link";
import { memo } from "react";

import { INDEX_FOOTER_NAVIGATION, SITE_TITLE } from "../../config";

export const Footer = memo(() => {
  return (
    <footer className="mt-32 flex flex-col justify-between border-t-[1px] border-slate-300/50 py-32 dark:border-slate-700/50 md:flex-row">
      <p className="mb-4 text-2xl dark:text-white md:text-center">
        {SITE_TITLE}
      </p>

      <ul className="flex flex-col gap-2">
        {INDEX_FOOTER_NAVIGATION.map(({ name, href }) => (
          <li key={href}>
            <Link
              className="text-md mx-auto mt-4 max-w-md text-slate-600 hover:underline dark:text-slate-400"
              href={href}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
});

Footer.displayName = "Footer";
