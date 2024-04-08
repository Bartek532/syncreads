import { buttonVariants } from "@/components/ui/button";
import { LANDING_FEEDBACK } from "@/config";

export const Feedback = () => {
  return (
    <div className="w-full animate-gradient rounded-3xl bg-gradient-to-r from-primary via-muted to-primary bg-[length:200%_auto] p-1 shadow-xl shadow-muted-foreground/60 dark:shadow-none">
      <div className="flex flex-col items-center justify-between gap-8 rounded-[1.25rem] bg-background px-8 py-9 md:flex-row md:gap-12 md:px-10 md:py-12">
        <div className="flex max-w-3xl flex-col gap-2">
          <h3 className="text-center text-xl font-bold sm:text-2xl md:text-left md:text-3xl">
            {LANDING_FEEDBACK.title}
          </h3>
          <p className="md:text-md text-center text-sm text-muted-foreground md:text-left">
            {LANDING_FEEDBACK.description}
          </p>
        </div>
        <a
          className={buttonVariants({ size: "lg" })}
          href={LANDING_FEEDBACK.cta.href}
          rel="noreferrer"
        >
          {LANDING_FEEDBACK.cta.text}
        </a>
      </div>
    </div>
  );
};
