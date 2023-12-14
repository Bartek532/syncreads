import Link from "next/link";

import { DASHBOARD_NAVIGATION } from "@/config/dashboard";
import { cn } from "@/utils";

export const Navigation = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <nav
      className={cn("flex items-center space-x-6 lg:space-x-8", className)}
      {...props}
    >
      {DASHBOARD_NAVIGATION.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};
