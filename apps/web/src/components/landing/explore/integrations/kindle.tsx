import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { ThemedImage } from "../../../ui/themed-image";
import { INTEGRATIONS } from "../constants/integrations";
import { Banner } from "../layout/banner/banner";
import { Features } from "../layout/features/features";
import { Reviews } from "../layout/reviews/reviews";
import { Setup } from "../layout/setup/setup";

const HERO_IMAGE = {
  light: "/images/landing/integrations/kindle/hero/light.png",
  dark: "/images/landing/integrations/kindle/hero/dark.png",
};

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
          <ThemedImage
            src={HERO_IMAGE}
            defaultVariant="light"
            width={1092}
            height={1143}
            className="max-w-full -translate-x-6 -translate-y-6"
            alt="Kindle Integration"
          />
        </div>
      </section>
      <section className="my-16 w-full md:my-32 lg:my-52">
        <blockquote className="mt-4 w-full text-center">
          <p className="text-2xl italic text-muted-foreground before:content-['“'] after:content-['“'] md:text-3xl lg:text-4xl">
            I will never come back to Send to Kindle.
          </p>
        </blockquote>
      </section>

      <Features />

      <section className="my-20 flex flex-col items-center justify-center gap-2 md:my-32 md:gap-3 lg:my-44">
        <span className="animate-gradient bg-gradient-to-r from-primary via-muted-foreground via-20% to-primary bg-[length:200%_auto] bg-clip-text text-5xl font-bold text-transparent sm:text-6xl md:text-7xl lg:text-8xl">
          50,000,000
        </span>
        <p className="text-muted-foreground sm:text-lg md:text-2xl">
          Kindle devices sold worldwide
        </p>
      </section>

      <Setup steps={INTEGRATIONS.kindle.setup} />
      <Banner />
    </div>
  );
};
