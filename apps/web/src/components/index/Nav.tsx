"use client";

import { Bars2Icon, XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { memo, useState } from "react";

import { INDEX_NAVIGATION, SITE_TITLE } from "../../config";
import { lockScroll, unlockScroll } from "../../utils/pageScroll";

export const Nav = memo(() => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleMobileNavOpen = () => {
    setIsMobileNavOpen((prev) => {
      if (prev) {
        unlockScroll();
      }

      if (!prev) {
        lockScroll();
      }

      return !prev;
    });
  };

  return (
    <>
      <div className="backdrop-filter-50 sticky top-6 z-[300] flex w-full flex-wrap items-center justify-between rounded-full py-2 px-4 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="text-xl font-medium tracking-tight text-black dark:text-white">
            {SITE_TITLE}
          </span>
        </div>

        <nav>
          <ul className="hidden items-center space-x-4 sm:flex">
            {INDEX_NAVIGATION.map(({ name, href }) => (
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

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full sm:hidden"
          onClick={handleMobileNavOpen}
        >
          {isMobileNavOpen ? (
            <XMarkIcon className="h-6 w-6 dark:text-white" />
          ) : (
            <Bars2Icon className="h-6 w-6 dark:text-white" />
          )}
        </button>
      </div>

      {isMobileNavOpen && (
        <div className="fixed inset-0 z-[200] h-screen w-screen p-4">
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-indigo-500/5 backdrop-blur-md dark:bg-black/80" />
          <div className="absolute inset-0 flex flex-col items-center justify-start gap-4 p-4 pt-28">
            <ul className="flex w-full flex-row flex-wrap items-center justify-center gap-4 py-2 px-4">
              {INDEX_NAVIGATION.map(({ name, href }) => (
                <li key={href} className="w-full">
                  <Link
                    className="block w-full border-b-[0.02rem] border-slate-800/50 py-2 text-sm tracking-tight hover:underline dark:text-white"
                    href={href}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
});

Nav.displayName = "Nav";
