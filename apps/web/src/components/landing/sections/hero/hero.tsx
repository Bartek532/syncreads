"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { Sparkles } from "@/components/ui/sparkles";

import { SITE_DESCRIPTION } from "../../../../config";
import { buttonVariants } from "../../../ui/button";

export const Hero = () => {
  return (
    <section
      className="flex w-full flex-col items-center justify-center gap-4 py-12 md:gap-6 md:py-24 lg:py-32"
      id="hero"
    >
      <motion.h1
        className="lg:leading-tighter max-w-4xl text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl"
        initial={{ opacity: 0, y: -55 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeInOut", delay: 0.1 },
        }}
        viewport={{ once: true }}
      >
        Seamlessly <Sparkles>sync</Sparkles> articles and feeds from the web.
      </motion.h1>
      <motion.p
        className="max-w-2xl text-center text-muted-foreground md:text-xl"
        initial={{ opacity: 0, y: -45 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeInOut", delay: 0.2 },
        }}
        viewport={{ once: true }}
      >
        {SITE_DESCRIPTION}
      </motion.p>
      <motion.div
        className="mt-2 flex gap-4 sm:mt-4"
        initial={{ opacity: 0, y: -45 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeInOut", delay: 0.3 },
        }}
        viewport={{ once: true }}
      >
        <Link href="/auth/login" className={buttonVariants()}>
          Get started
        </Link>
        <Link href="#about" className={buttonVariants({ variant: "outline" })}>
          Learn more
        </Link>
      </motion.div>

      <motion.div
        className="mt-6 aspect-video w-full rounded-lg bg-muted sm:mt-10 sm:w-11/12"
        initial={{ opacity: 0, rotateX: 35, y: -20 }}
        whileInView={{
          opacity: 1,
          rotateX: 0,
          y: 0,
          transition: { duration: 0.5, ease: "easeInOut", delay: 0.5 },
        }}
        viewport={{ once: true }}
      ></motion.div>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 text-sm sm:mt-20 md:text-lg lg:mt-28">
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-14 lg:gap-20"
          initial={{ opacity: 0, y: -45 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeInOut", delay: 0.6 },
          }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold md:text-4xl">1,000+</span>
            <p className="text-muted-foreground">Daily syncs</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-center text-3xl font-bold md:text-4xl">
              120+ hours
            </span>
            <p className="text-muted-foreground">Average saved time</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold md:text-4xl">99.9%</span>
            <p className="text-muted-foreground">Uptime</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
