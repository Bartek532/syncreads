import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { INTEGRATIONS } from "../constants/integrations";
import { Reviews } from "../layout/reviews/reviews";

export const ExploreIntegrationKindle = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10">
      <section className="flex w-full flex-wrap items-center justify-center gap-14 md:flex-nowrap md:justify-between">
        <div className="flex max-w-2xl flex-col gap-4">
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
          <Reviews
            rating={INTEGRATIONS.kindle.reviews.rating}
            description={`from ${INTEGRATIONS.kindle.reviews.total} reviews`}
            users={INTEGRATIONS.kindle.reviews.users}
          />
        </div>

        <div className="max-w-md shrink lg:max-w-lg">
          <Image
            src="/images/landing/explore/kindle/hero.png"
            width={1092}
            height={1143}
            className="max-w-full -translate-x-6 -translate-y-6"
            alt="Kindle Integration"
          />
        </div>
      </section>
      <section className="my-12 w-full md:my-20 lg:my-32">
        <blockquote className="mt-4 w-full text-center">
          <p className="text-2xl italic text-muted-foreground before:content-['“'] after:content-['“'] md:text-3xl">
            I will never come back to Send to Kindle.
          </p>
        </blockquote>
      </section>

      <section>
        <div className="flex flex-col items-center justify-center gap-1">
          <h3
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            id="features"
          >
            Features
          </h3>
          <p className="text-center text-muted-foreground">
            See overview of what we can do together.
          </p>
        </div>
      </section>
    </div>
  );
};
