import { buttonVariants } from "@/components/ui/button";
import { Sparkles } from "@/components/ui/sparkles";

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
          <a
            href=""
            target="blank"
            rel="noopener noreferrer"
            className={buttonVariants()}
          >
            Download on Chrome Web Store
          </a>
        </div>
      </section>
    </div>
  );
};
