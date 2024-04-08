import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export const ExploreIntegrationKindle = () => {
  return (
    <div className="w-full">
      <section className="flex w-full items-center justify-between gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Connect your Kindle to SyncReads
          </h2>
          <p className="text-muted-foreground">
            Stop losing your highlights and focus. Organize everything in one
            place, without any distractions.
          </p>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className={buttonVariants()}>
              Get started
            </Link>
            <Link
              href="#setup"
              className={buttonVariants({ variant: "outline" })}
            >
              How to setup?
            </Link>
          </div>
          <blockquote className="mt-4">
            <p className="italic text-muted-foreground">
              &quot;I will never come back to Send to Kindle.&quot;
            </p>
          </blockquote>
        </div>

        <div className="h-96 w-1/2 shrink-0 bg-muted"></div>
      </section>
    </div>
  );
};
