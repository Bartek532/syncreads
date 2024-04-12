"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { INTEGRATIONS } from "../../constants/integrations";

import type { Integration } from "../../constants/integrations";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex flex-wrap justify-center gap-2">
        {(Object.keys(INTEGRATIONS) as Integration[]).map((integration) => (
          <li
            key={integration}
            className="flex flex-1 grow-0 basis-40 rounded-lg bg-muted p-1 sm:basis-52 md:basis-72"
          >
            <Link
              className="relative block grow px-4 py-3 pl-3"
              href={`/explore/${integration}`}
            >
              <div className="relative z-10 flex items-start gap-3 md:gap-4">
                <Image
                  src={INTEGRATIONS[integration].icon}
                  alt=""
                  width="36"
                  height="36"
                  className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10"
                />
                <div>
                  <span className="text-sm font-bold md:text-lg">
                    {INTEGRATIONS[integration].name}
                  </span>
                  <p className="hidden text-xs text-muted-foreground sm:block md:text-sm">
                    {INTEGRATIONS[integration].description}
                  </p>
                </div>
              </div>
              {pathname.includes(integration) ? (
                <motion.div
                  className="absolute inset-0 h-full rounded-lg bg-primary-foreground"
                  layoutId="active"
                  transition={{ type: "spring", stiffness: 270, damping: 30 }}
                />
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
