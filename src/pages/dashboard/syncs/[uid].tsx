import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";

import { Seo } from "../../../components/common/Seo";
import { DashboardLayout } from "../../../components/dashboard/layout/Layout";
import { createContext } from "../../../server/trpc/context";
import { appRouter } from "../../../server/trpc/router/_app";
import { SyncView } from "../../../views/dashboard/syncs/Sync";

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

const Sync = ({
  uid,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Seo title="Dashboard - Sync" />
      <DashboardLayout>
        <SyncView uid={uid} />
      </DashboardLayout>
    </>
  );
};

export const getServerSideProps = async ({
  params,
  req,
  res,
}: GetServerSidePropsContext<{ uid: string }>) => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    //@ts-expect-error res is not compatible with trpc
    ctx: await createContext({ req, res }),
    transformer: superjson,
  });

  const uid = params!.uid;

  await ssg.sync.getSyncLog.prefetch({ uid });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      uid,
    },
  };
};

export default Sync;
