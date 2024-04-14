import { APP_NAME } from "@syncreads/shared";
import { CheckIcon, XIcon } from "lucide-react";

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
            <Sparkles>Click & Sync</Sparkles>
          </h2>
          <p className="text-center">
            The browser extension allows you to sync articles from your favorite
            websites with a single click.
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

      <section>
        <div className="flex flex-col items-center justify-center gap-1">
          <h3 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Put the whole web into your pocket
          </h3>
          <p className="text-center text-muted-foreground">
            {APP_NAME} supports the internet&apos; top sites.
          </p>
        </div>
      </section>
    </div>
  );
};
