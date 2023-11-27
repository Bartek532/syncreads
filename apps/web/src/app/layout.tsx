import { Poppins } from "next/font/google";
import { cookies } from "next/headers";

import { GlobalUI } from "../components/common/GlobalUI";
import { AppProviders } from "../providers/AppProviders";
import { getServerAuthSession } from "../server/auth";
import "../styles/globals.css";
import { TRPCReactProvider } from "../trpc/react";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body className={`font-sans ${poppins.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <AppProviders session={session}>
            {children}
            <GlobalUI />
          </AppProviders>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
