import { memo } from "react";

import { ThemedImage } from "../../../../ui/themed-image";

type Step = {
  readonly name: string;
  readonly description: string;
  readonly actions: React.ReactNode[];
  readonly image: {
    readonly src: {
      readonly light: string;
      readonly dark: string;
    };
    readonly width: number;
    readonly height: number;
  };
};

type SetupProps = {
  readonly steps: Step[];
};

export const Setup = memo<SetupProps>(({ steps }) => {
  return (
    <section className="w-full">
      <div className="flex flex-col items-center justify-center gap-1">
        <h3
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          id="setup"
        >
          Setup
        </h3>
        <p className="text-center text-muted-foreground">
          Follow these simple steps to get started.
        </p>
      </div>

      <div className="steps my-16">
        {steps.map((step) => (
          <div
            key={step.name}
            className="step flex flex-wrap items-center justify-evenly gap-10 py-12 pt-16 lg:gap-20 lg:py-20 lg:pt-24"
          >
            <div className="flex grow basis-full flex-col gap-5 lg:basis-1/3">
              <div className="flex flex-col gap-1">
                <h4 className="text-xl font-bold">{step.name}</h4>
                <p>{step.description}</p>
              </div>

              <div className="flex gap-4">{step.actions}</div>
            </div>
            <div className="basis-full rounded-lg border-2 border-primary-foreground lg:basis-1/2">
              <ThemedImage
                src={step.image.src}
                defaultVariant="light"
                width={step.image.width}
                height={step.image.height}
                className="max-w-full rounded-lg shadow"
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

Setup.displayName = "Setup";
