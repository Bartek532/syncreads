import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { ThemedImage } from "../../../ui/themed-image";
import { INTEGRATIONS } from "../constants/integrations";
import { Features } from "../layout/features/features";
import { Reviews } from "../layout/reviews/reviews";

const HERO_IMAGE = {
  light: "/images/landing/integrations/remarkable/hero/light.png",
  dark: "/images/landing/integrations/remarkable/hero/dark.png",
};

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
          <ThemedImage
            src={HERO_IMAGE}
            defaultVariant="light"
            width={1092}
            height={1143}
            className="max-w-full -translate-x-6 -translate-y-6"
            alt="reMarkable Integration"
          />
        </div>
      </section>

      <div className="relative mt-12 md:mt-20 lg:mt-32">
        <Image
          src="/images/landing/integrations/remarkable/banner.png"
          alt="reMarkable with feeds"
          width={1700}
          height={1100}
          className="pointer-events-none select-none drop-shadow-md md:max-w-5xl"
        />
        <div className="absolute -bottom-6 left-0 right-0 h-1/4 rounded-lg bg-background shadow-fading"></div>
      </div>

      <div className="my-4 lg:my-6">
        <Features />
      </div>
    </div>
  );
};
