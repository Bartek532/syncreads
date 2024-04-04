"use client";

import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { memo } from "react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import type { SOCIAL_PROVIDER } from "@/types/auth.types";
import { onPromise } from "@/utils";

import { useAuthFormStore } from "./store";

type SocialProvidersProps = {
  readonly providers: SOCIAL_PROVIDER[];
};

export const SocialProviders = memo<SocialProvidersProps>(({ providers }) => {
  const {
    provider: actualProvider,
    setProvider,
    isSubmitting,
    setIsSubmitting,
  } = useAuthFormStore();

  const handleSignIn = async (provider: SOCIAL_PROVIDER) => {
    setProvider(provider);
    setIsSubmitting(true);

    await supabase().auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    setIsSubmitting(false);
  };

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
            disabled={isSubmitting}
            onClick={onPromise(() => handleSignIn(provider))}
          >
            {isSubmitting && actualProvider === provider ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <span className="sr-only">Sign in with {provider}</span>
                <div className="h-6 w-6 dark:brightness-125">
                  <Icon />
                </div>
                <span className="capitalize">{provider}</span>
              </>
            )}
          </Button>
        );
      })}
    </div>
  );
});

SocialProviders.displayName = "SocialProviders";
