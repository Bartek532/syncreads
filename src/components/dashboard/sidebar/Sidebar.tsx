import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";

import type { HeroIcon } from "src/utils/types";

interface NavigationItem {
  readonly name: string;
  readonly href: string;
  readonly icon: HeroIcon;
}

interface SidebarProps {
  readonly navigation: NavigationItem[];
  readonly secondaryNavigation: Omit<NavigationItem, "current">[];
}

export const Sidebar = memo<SidebarProps>(
  ({ navigation, secondaryNavigation }) => {
    const { pathname } = useRouter();

    return (
      <>
        <div className="flex flex-shrink-0 items-center px-4">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=300"
            alt="Easywire logo"
          />
        </div>
        <nav
          className="mt-5 flex flex-1 flex-col divide-y divide-indigo-800 overflow-y-auto"
          aria-label="Sidebar"
        >
          <div className="space-y-1 px-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  pathname === item.href
                    ? "bg-indigo-800 text-white"
                    : "text-indigo-100 hover:bg-indigo-600 hover:text-white",
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6",
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                <item.icon
                  className="mr-4 h-6 w-6 flex-shrink-0 text-indigo-200"
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </div>
          <div className="mt-6 pt-6">
            <div className="space-y-1 px-2">
              {secondaryNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-indigo-100 hover:bg-indigo-600 hover:text-white"
                >
                  <item.icon
                    className="mr-4 h-6 w-6 text-indigo-200"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </>
    );
  },
);

Sidebar.displayName = "Sidebar";
