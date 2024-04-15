import { BlocksIcon, CheckIcon, XIcon } from "lucide-react";
import Image from "next/image";

import { buttonVariants } from "@/components/ui/button";
import { Sparkles } from "@/components/ui/sparkles";
import { ThemedImage } from "@/components/ui/themed-image";
import { cn } from "@/utils";

import { INTEGRATIONS } from "../constants/integrations";

export const ExploreIntegrationExtension = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10">
      <section className="flex w-full flex-col items-center justify-center gap-14">
        <div className="flex max-w-xl flex-col items-center gap-4">
          <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            <Sparkles>{INTEGRATIONS.extension.hero.title}</Sparkles>
          </h2>
          <p className="text-center">
            {INTEGRATIONS.extension.hero.description}
          </p>
          {INTEGRATIONS.extension.stores.map((store) => (
            <a
              key={store.id}
              href={store.link}
              target="blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants(),
                "mt-2 flex h-full items-center justify-center gap-3 lg:py-3",
              )}
            >
              <store.icon className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
              <span className="lg:text-lg">{store.cta}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-6 w-full md:mt-10 lg:mt-16">
        <div className="grid w-full grid-cols-1 items-start gap-10 md:grid-cols-2">
          {INTEGRATIONS.extension.features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-start justify-center"
            >
              <ThemedImage
                src={feature.image}
                defaultVariant="light"
                alt=""
                width={850}
                height={600}
                className="mb-4 w-full rounded-md shadow md:rounded-lg"
              />
              <h3 className="text-lg font-bold md:text-xl">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="my-16 flex w-full flex-col items-center md:my-32 lg:my-52">
        {INTEGRATIONS.extension.alternatives.map((alternative) => (
          <div
            className="flex items-center justify-center gap-3"
            key={alternative.id}
          >
            {alternative.success ? (
              <CheckIcon className="-ml-6 h-10 w-10 text-success md:-ml-8 md:h-12 md:w-12 lg:-ml-10 lg:h-14 lg:w-14" />
            ) : (
              <XIcon className="-ml-6 h-10 w-10 text-destructive md:-ml-8 md:h-12 md:w-12 lg:-ml-10 lg:h-14 lg:w-14" />
            )}
            <span
              className={cn(
                "text-2xl font-semibold md:text-3xl lg:text-4xl",
                !alternative.success && "text-muted-foreground line-through",
              )}
            >
              {alternative.name}
            </span>
          </div>
        ))}
      </section>

      <section className="flex w-full flex-col items-center justify-center gap-8 md:gap-12 lg:gap-16">
        <div className="flex flex-col items-center justify-center gap-1">
          <h3 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {INTEGRATIONS.extension.web.title}
          </h3>
          <p className="text-center text-muted-foreground">
            {INTEGRATIONS.extension.web.description}
          </p>
        </div>

        <div className="flex w-full flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-12">
          {INTEGRATIONS.extension.web.sites.map((site) => (
            <div
              key={site.name}
              className="flex basis-12 flex-col items-center justify-center gap-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]"
            >
              <Image
                src={site.icon}
                alt=""
                width={40}
                height={40}
                className="h-9 w-9 md:h-10 md:w-10 lg:h-12 lg:w-12"
              />
              <span className="text-sm text-muted-foreground">{site.name}</span>
            </div>
          ))}

          <div className="basis-18 -ml-4 flex flex-col items-center justify-center gap-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]">
            <BlocksIcon
              className="h-9 w-9 text-muted-foreground md:h-10 md:w-10 lg:h-12 lg:w-12"
              strokeWidth={1}
            />
            <span className="text-sm text-muted-foreground">
              {INTEGRATIONS.extension.web.more}
            </span>
          </div>
        </div>

        <Image
          src={INTEGRATIONS.extension.web.image}
          width={1640}
          height={1103}
          className="mb-6 mt-2 w-full max-w-5xl md:mb-10 md:mt-6 lg:mb-14 lg:mt-10"
          alt=""
        />
      </section>
    </div>
  );
};
