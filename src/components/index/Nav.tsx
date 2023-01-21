import Link from "next/link";
import { memo } from "react";

import { HOME_NAVIGATION, SITE_NAME } from "../../config";

export const Nav = memo(() => {
  return (
    <div className="backdrop-filter-50 sticky top-6 z-[1000] flex w-full flex-wrap items-center justify-between rounded-full border-[1px] px-8 py-2 backdrop-blur-md dark:border-slate-200/10 dark:bg-slate-900/30">
      <div className="flex items-center gap-3">
        <span className="text-xl font-semibold tracking-tight text-black dark:text-white">
          {SITE_NAME}
        </span>
      </div>

      {/* TODO Mobile navigation */}
      <nav>
        <ul className="hidden items-center space-x-4 md:flex">
          {HOME_NAVIGATION.map(({ name, href }) => (
            <li key={href}>
              <Link
                className="rounded-full px-2 py-4 text-sm tracking-tight hover:underline dark:text-white"
                href={href}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
});

Nav.displayName = "Nav";
