"use client";

import { usePathname, useRouter } from "next/navigation";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import * as NProgress from "nprogress";
import { memo, useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { TOASTER_CONFIG } from "@/config";

type ProvidersProps = {
  readonly children: React.ReactNode;
};

export const Providers = memo<ProvidersProps>(({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    NProgress.done();
  }, [pathname, router]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextTopLoader showSpinner={false} color="#6b7280" />
      <Toaster
        position="bottom-right"
        containerStyle={{ padding: "20px" }}
        gutter={13}
        toastOptions={TOASTER_CONFIG}
      />
      {children}
    </ThemeProvider>
  );
});

Providers.displayName = "Providers";
