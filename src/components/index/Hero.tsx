import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import { INDEX_HERO_SUBTITLE, SITE_NAME } from "../../config";

export const Hero = memo(() => {
  return (
    <section className="relative flex flex-col items-center justify-center gap-4 pt-28">
      <div className="-z-1 pointer-events-none absolute h-64 w-80 -translate-y-60 scale-[2.5] rounded-full from-indigo-800/60 to-indigo-800/20 blur-3xl dark:bg-gradient-to-br" />
      <div className="-z-1 pointer-events-none absolute h-12 w-80 translate-y-60 scale-[2] rounded-full from-yellow-800/70 to-indigo-800/30 blur-3xl dark:bg-gradient-to-br" />

      <h1 className="lg:6xl z-20 bg-gradient-to-tl from-indigo-500 to-pink-500 bg-clip-text text-5xl font-medium leading-none tracking-wide text-transparent md:text-6xl">
        {SITE_NAME}
      </h1>

      <h2 className="z-10 mx-auto mb-4  max-w-md text-center text-lg text-slate-600 dark:text-slate-400">
        {INDEX_HERO_SUBTITLE}
      </h2>

      <Link
        href="/login"
        className="z-10 mt-4 rounded-full bg-black/10 px-10 py-3 font-medium text-black no-underline transition hover:bg-black/10 hover:text-black dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
      >
        Sign in
      </Link>

      <div className="relative translate-y-12 sm:translate-y-16 md:translate-y-20">
        <div className="absolute inset-0 bg-gradient-to-t from-white to-black/0 dark:from-black/100" />
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
