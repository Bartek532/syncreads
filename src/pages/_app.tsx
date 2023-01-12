import { Toaster } from "react-hot-toast";

import { GlobalUI } from "../components/common/GlobalUI";
import { AppProviders } from "../providers/AppProviders";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";

import type { Session } from "next-auth";
import type { AppType } from "next/app";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <AppProviders session={session}>
      <Component {...pageProps} />
      <GlobalUI />
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
    </AppProviders>
  );
};

export default trpc.withTRPC(MyApp);
