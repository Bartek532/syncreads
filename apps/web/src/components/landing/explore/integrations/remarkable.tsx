import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { INTEGRATIONS } from "../constants/integrations";
import { Reviews } from "../layout/reviews/reviews";

export const ExploreIntegrationRemarkable = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10">
      <section className="flex w-full flex-wrap items-center justify-center gap-14 md:flex-nowrap md:justify-between">
        <div className="flex max-w-2xl flex-col gap-4">
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
          <Reviews
            rating={INTEGRATIONS.remarkable.reviews.rating}
            description={`from ${INTEGRATIONS.remarkable.reviews.total} reviews`}
            users={INTEGRATIONS.remarkable.reviews.users}
          />
        </div>

        <div className="max-w-md shrink lg:max-w-lg">
          <Image
            src="/images/landing/explore/remarkable/hero.png"
            width={1092}
            height={1143}
            className="max-w-full -translate-x-6 -translate-y-6"
            alt="Kindle Integration"
          />
        </div>
      </section>
    </div>
  );
};
