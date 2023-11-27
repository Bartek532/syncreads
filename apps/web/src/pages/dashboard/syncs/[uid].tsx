import { Seo } from "../../../components/common/Seo";
import { DashboardLayout } from "../../../components/dashboard/layout/Layout";
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

export const getServerSideProps = ({
  params,
}: GetServerSidePropsContext<{ uid: string }>) => {
  // const ssg = createServerSideHelpers({
  //   router: appRouter,
  //   //@ts-expect-error res is not compatible with trpc
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  //   ctx: await createTRPCContext({ req, res }),
  //   transformer: superjson,
  // });

  const uid = params?.uid ?? "";

  // await ssg.sync.getSyncLog.prefetch({ uid });

  return {
    props: {
      // trpcState: ssg.dehydrate(),
      uid,
    },
  };
};

export default Sync;
