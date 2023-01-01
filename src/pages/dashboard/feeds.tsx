import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CreateFeedInput } from "src/utils/validation";
import { createFeedSchema } from "src/utils/validation";
import { trpc } from "src/utils/trpc";
import { useSession } from "next-auth/react";

const Feeds: NextPage = () => {
  const { data } = useSession();
  const { register, handleSubmit } = useForm<CreateFeedInput>({
    resolver: zodResolver(createFeedSchema),
  });

  const feeds = trpc.user.getUserFeeds.useQuery({
    email: data?.user?.email as string,
  });

  const addFeedMutation = trpc.feed.createFeed.useMutation();

  const onSubmit = async ({ url }: CreateFeedInput) => {
    await addFeedMutation.mutateAsync({
      url,
      email: data?.user?.email as string,
    });
  };

  return (
    <div>
      <main>
        <code>{JSON.stringify(feeds.data)}</code>
        <form
          className="flex h-screen w-full items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="card-title">Add feed!</h2>
          <input
            type="url"
            placeholder="Type url..."
            className="input input-bordered mt-2 w-full max-w-xs"
            {...register("url")}
          />

          <div className="card-actions items-center justify-between">
            <button className="btn btn-secondary" type="submit">
              Add feed
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Feeds;
