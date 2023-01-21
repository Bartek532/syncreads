import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import { HERO_SUBTITLE, SITE_NAME } from "../../config";

export const Hero = memo(() => {
  return (
    <section className="relative flex flex-col items-center justify-center gap-4 pt-28">
      <div className="-z-1 pointer-events-none absolute h-64 w-80 -translate-y-60 scale-[2.5] rounded-full bg-gradient-to-br from-indigo-800/60 to-indigo-800/20 blur-3xl" />
      <div className="-z-1 pointer-events-none absolute h-12 w-80 translate-y-60 scale-[2] rounded-full bg-gradient-to-br from-yellow-800/70 to-indigo-800/30 blur-3xl" />

      <h1 className="lg:6xl z-20 bg-gradient-to-tl from-indigo-500 to-pink-500 bg-clip-text text-5xl font-medium leading-none tracking-wide text-transparent md:text-6xl">
        {SITE_NAME}
      </h1>

      <h2 className="z-10 mx-auto mb-4  max-w-md text-center text-lg text-slate-600 dark:text-slate-400">
        {HERO_SUBTITLE}
      </h2>

      <Link
        href="/login"
        className="z-10 rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      >
        Sign in
      </Link>

      <div className="relative translate-y-12 sm:translate-y-16 md:translate-y-20">
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-black/0" />
        <Image
          src="/rssmarkable-hero.png"
          alt="reMarkable tablet surrounded by RSS feeds icons"
          priority={true}
          width={1200}
          height={400}
        />
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
