import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { cookies } from "next/headers";

import { Toaster } from "../components/ui/sonner";
import { DEFAULT_METADATA } from "../lib/metadata";
import "../styles/globals.css";
import { TRPCReactProvider } from "../trpc/react";

export const metadata = DEFAULT_METADATA;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <Toaster />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
