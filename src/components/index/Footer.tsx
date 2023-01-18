import Link from "next/link";
import { memo } from "react";

import { HOME_FOOTER_NAVIGATION } from "../../utils/consts";

export const Footer = memo(() => {
  return (
    <footer className="mt-32 flex flex-col justify-between border-t-[1px] border-slate-700/50 py-32 md:flex-row">
      <p className="mb-4 text-2xl text-white md:text-center">RSSMarkable</p>

      <ul className="flex flex-col gap-2">
        {HOME_FOOTER_NAVIGATION.map(({ name, href }) => (
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
