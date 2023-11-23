import { cookies } from "next/headers";

import { GlobalUI } from "../components/common/GlobalUI";
import { AppProviders } from "../providers/AppProviders";
import { getServerAuthSession } from "../server/auth";
import "../styles/globals.css";
import { TRPCReactProvider } from "../trpc/react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body>
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
