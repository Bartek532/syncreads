import { Poppins } from "next/font/google";
import { cookies } from "next/headers";

import { GlobalUI } from "../components/common/GlobalUI";
import { DEFAULT_METADATA } from "../lib/metadata";
import "../styles/globals.css";
import { TRPCReactProvider } from "../trpc/react";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = DEFAULT_METADATA;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${poppins.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <GlobalUI />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
