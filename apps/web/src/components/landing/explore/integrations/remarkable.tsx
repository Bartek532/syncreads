import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export const ExploreIntegrationRemarkable = () => {
  return (
    <div className="w-full">
      <section className="flex w-full items-center justify-between gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Make reMarkable truly remarkable
          </h2>
          <p className="text-muted-foreground">
            No more manual work - everything synced automatically. Focus on
            consuming and leave the rest to us.
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
        </div>

        <div className="h-96 w-1/2 shrink-0 bg-muted"></div>
      </section>
    </div>
  );
};
