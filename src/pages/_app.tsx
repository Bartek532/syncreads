import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import "../styles/globals.css";
import { trpc } from "../utils/trpc";

import type { Session } from "next-auth";
import type { AppType } from "next/app";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Toaster
        position="bottom-right"
        containerStyle={{ padding: "20px" }}
        gutter={13}
        toastOptions={{
          style: {
            padding: "14px 25px",
            minWidth: "250px",
            gap: "10px",
          },
          error: {
            style: {
              backgroundColor: "#fef2f2",
              color: "#991b1b",
            },
          },
          success: {
            style: {
              backgroundColor: "#f0fdf4",
              color: "#15803d",
            },
          },
        }}
      />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
