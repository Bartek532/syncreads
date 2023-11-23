import { headers } from "next/headers";
import { getServerSession } from "next-auth";

import { GlobalUI } from "../components/common/GlobalUI";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { AppProviders } from "../providers/AppProviders";
import "../styles/globals.css";
import { TRPCReactProvider } from "../trpc/react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <TRPCReactProvider headers={headers()}>
          <AppProviders session={session}>
            {children}
            <GlobalUI />
          </AppProviders>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
