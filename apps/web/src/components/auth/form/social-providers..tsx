"use client";

import dynamic from "next/dynamic";
import { memo } from "react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import type { AUTH_PROVIDER } from "@/types/auth.types";
import { onPromise } from "@/utils";

type SocialProvidersProps = {
  readonly providers: AUTH_PROVIDER[];
};

export const SocialProviders = memo<SocialProvidersProps>(({ providers }) => {
  return (
    <div className="flex w-full flex-col items-stretch justify-center gap-2">
      {Object.values(providers).map((provider) => {
        const Icon = dynamic(() => import(`public/svg/social/${provider}.svg`));

        return (
          <Button
            key={provider}
            variant="outline"
            type="button"
            size="lg"
            className="inline-flex w-full justify-center gap-4"
            onClick={onPromise(async () => {
              const { data, error } = await supabase().auth.signInWithOAuth({
                provider,
                options: {
                  redirectTo: `${location.origin}/auth/callback`,
                },
              });

              console.log({ data, error });
            })}
          >
            <span className="sr-only">Sign in with {provider}</span>

            <div className="h-6 w-6 dark:brightness-125">
              <Icon />
            </div>
            <span className="capitalize">{provider}</span>
          </Button>
        );
      })}
    </div>
  );
});

SocialProviders.displayName = "SocialProviders";
