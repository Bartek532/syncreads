import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { INTEGRATIONS } from "../constants/integrations";

export const ExploreIntegrationKindle = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10">
      <section className="flex w-full items-center justify-between gap-10">
        <div className="flex max-w-2xl flex-col gap-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Connect your Kindle to SyncReads
          </h2>
          <p className="text-muted-foreground">
            Stop losing your highlights and focus. Organize everything in one
            place, without any distractions.
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
          <div>
            <div className="flex items-center justify-start gap-2">
              {INTEGRATIONS.kindle.reviews.users.map((user) => (
                <Image
                  key={user.avatar}
                  src={user.avatar}
                  width={48}
                  height={48}
                  className="rounded-full"
                  alt="User Avatar"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-xl">
          <Image
            src="/images/landing/explore/kindle/hero.png"
            width={1092}
            height={1143}
            className="max-w-full -translate-x-6 -translate-y-6"
            alt="Kindle Integration"
          />
        </div>
      </section>
      <section className="mt-16 w-full">
        <blockquote className="mt-4 w-full text-center">
          <p className="text-3xl italic text-muted-foreground">
            &quot;I will never come back to Send to Kindle.&quot;
          </p>
        </blockquote>
      </section>
    </div>
  );
};
