"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { INTEGRATIONS } from "../../constants/integrations";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="lg:text-md flex gap-1 rounded-full bg-muted-foreground/15 px-1.5 py-1 text-sm font-bold">
        {INTEGRATIONS.map((integration) => (
          <li
            key={integration.id}
            className="relative rounded-full py-1 pl-3 pr-4"
          >
            <Link
              href={`/explore/${integration.id}`}
              className="relative z-10 flex items-center gap-2.5"
            >
              <Image
                src={`/images/landing/explore/${integration.id}.png`}
                alt="Kindle"
                width="17"
                height="17"
              />
              {integration.name}
            </Link>
            {pathname.includes(integration.id) ? (
              <motion.div
                className="absolute inset-0 h-full rounded-full bg-primary-foreground"
                layoutId="active"
                transition={{ type: "spring", stiffness: 270, damping: 30 }}
              />
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
};
