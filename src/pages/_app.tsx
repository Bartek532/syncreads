import { Toaster } from "react-hot-toast";

import { GlobalUI } from "../components/common/GlobalUI";
import { TOASTER_CONFIG } from "../config";
import { AppProviders } from "../providers/AppProviders";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";

import type { AppType } from "next/app";
import type { Session } from "next-auth";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <AppProviders session={session}>
        <Component {...pageProps} />
        <GlobalUI />
        <Toaster
          position="bottom-right"
          containerStyle={{ padding: "20px" }}
          gutter={13}
          toastOptions={TOASTER_CONFIG}
        />
      </AppProviders>
    </>
  );
};

export default trpc.withTRPC(MyApp);
