import Link from "next/link";

import { SITE_DESCRIPTION, SITE_TITLE_APPENDIX } from "../../../../config";
import { buttonVariants } from "../../../ui/button";

export const Hero = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 py-12 md:gap-6 md:py-24 lg:py-32">
      <h1 className="lg:leading-tighter max-w-3xl text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
        {SITE_TITLE_APPENDIX}
      </h1>
      <p className="max-w-2xl text-center text-muted-foreground md:text-xl">
        {SITE_DESCRIPTION}
      </p>
      <div className="mt-2 flex gap-4 sm:mt-4">
        <Link href="/auth/login" className={buttonVariants()}>
          Get started
        </Link>
        <Link
          href="#discover"
          className={buttonVariants({ variant: "outline" })}
        >
          Learn more
        </Link>
      </div>

      <div className="mt-6 aspect-video w-full rounded-lg bg-muted sm:mt-10 sm:w-11/12"></div>

      <div className="mt-12 flex flex-col items-center justify-center gap-4 text-sm sm:mt-24 md:text-lg">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-14 lg:gap-20">
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold md:text-4xl">1,000+</span>
            <p className="text-muted-foreground">Daily syncs</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-center text-3xl font-bold md:text-4xl">
              120+ hours
            </span>
            <p className="text-muted-foreground">Total saved time</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold md:text-4xl">99.9%</span>
            <p className="text-muted-foreground">Uptime</p>
          </div>
        </div>
      </div>
    </section>
  );
};
