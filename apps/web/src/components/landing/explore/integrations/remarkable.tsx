import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { ThemedImage } from "../../../ui/themed-image";
import { INTEGRATIONS } from "../constants/integrations";
import { Banner } from "../layout/banner/banner";
import { Features } from "../layout/features/features";
import { Reviews } from "../layout/reviews/reviews";
import { Setup } from "../layout/setup/setup";

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
          className="pointer-events-none select-none drop-shadow-md md:max-w-full lg:max-w-5xl"
        />
        <div className="absolute -bottom-6 left-0 right-0 h-1/4 rounded-lg bg-background shadow-fading"></div>
      </div>

      <div className="mt-4 lg:mt-6">
        <Features />
      </div>

      <section className="my-16 flex w-full flex-col items-center gap-8 md:my-32 md:gap-12 lg:my-52">
        <blockquote className="mt-4 flex w-full justify-center text-center">
          <p className="max-w-3xl text-2xl italic text-muted-foreground before:content-['“'] after:content-['“'] md:text-3xl lg:text-4xl">
            Very easy to set up and use. Click click and it&apos;s on your rM.
          </p>
        </blockquote>
        <div className="flex gap-3  md:gap-5">
          <Image
            src="/images/landing/integrations/remarkable/reviews/evon-smith.jpg"
            alt="Evan Smith avatar"
            width={55}
            height={55}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-bold md:text-lg">Evon Smith</span>
            <span className="text-muted-foreground">reMarkable 2 user</span>
          </div>
        </div>
      </section>

      <Setup steps={INTEGRATIONS.remarkable.setup} />
      <Banner />
    </div>
  );
};
