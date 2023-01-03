import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import { onPromise } from "src/utils/functions";
import { trpc } from "src/utils/trpc";
import { createFeedSchema } from "src/utils/validation";

import type { NextPage } from "next";
import type { CreateFeedInput } from "src/utils/validation";

const Feeds: NextPage = () => {
  const { data } = useSession();
  const { register, handleSubmit } = useForm<CreateFeedInput>({
    resolver: zodResolver(createFeedSchema),
  });

  if (!data?.user?.email) {
    return null;
  }

  const feeds = trpc.user.getUserFeeds.useQuery({
    email: data.user.email,
  });

  const addFeedMutation = trpc.feed.createFeed.useMutation();

  const onSubmit = ({ url }: CreateFeedInput) =>
    addFeedMutation.mutateAsync({
      url,
      email: data.user!.email!,
    });

  return (
    <div>
      <main>
        <code>{JSON.stringify(feeds.data)}</code>
        <form
          className="flex h-screen w-full items-center justify-center"
          onSubmit={onPromise(handleSubmit(onSubmit))}
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
