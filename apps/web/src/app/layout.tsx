import "@syncreads/config/ui/css/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { cookies } from "next/headers";

import { Providers } from "@/providers/providers";

import { DEFAULT_METADATA, DEFAULT_VIEWPORT } from "../lib/metadata";
import "../styles/globals.css";
import { TRPCReactProvider } from "../trpc/react";

export const metadata = DEFAULT_METADATA;
export const viewport = DEFAULT_VIEWPORT;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth focus:scroll-auto">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <Providers>{children}</Providers>
        </TRPCReactProvider>
        <Analytics />
      </body>
    </html>
  );
}
