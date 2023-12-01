"use client";

import { ThemeProvider } from "./ThemeProvider";
import { UIProvider } from "./UIProvider";

import type { ReactNode } from "react";

type AppProvidersProps = Readonly<{
  children: ReactNode;
}>;

export const AppProviders = ({ children }: AppProvidersProps) => (
  <ThemeProvider>
    <UIProvider>{children}</UIProvider>
  </ThemeProvider>
);
