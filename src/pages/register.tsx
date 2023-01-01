import type { NextPage } from "next";
import Link from "next/link";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema } from "src/utils/validation";
import { trpc } from "src/utils/trpc";
import type { Register } from "src/utils/types";

const SignUp: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Register>({
    resolver: zodResolver(loginUserSchema),
  });

  const { mutateAsync } = trpc.auth.register.useMutation();

  const onSubmit = useCallback(
    async (data: Register) => {
      const result = await mutateAsync(data);
      if (+result.status === 201) {
        router.push("/");
      }
    },
    [mutateAsync, router]
  );

  return (
    <div>
      <main>
        <form
          className="flex h-screen w-full items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Create an account!</h2>
              <input
                type="text"
                placeholder="Type your username..."
                className="input input-bordered my-2 w-full max-w-xs"
                {...register("name")}
              />
              <input
                type="email"
                placeholder="Type your email..."
                className="input input-bordered w-full max-w-xs"
                {...register("email")}
              />
              <input
                type="password"
                placeholder="Type your password..."
                className="input input-bordered my-2 w-full max-w-xs"
                {...register("password")}
              />
              <div className="card-actions items-center justify-between">
                <Link href="/login" className="link">
                  Go to login
                </Link>
                <button className="btn btn-secondary" type="submit">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignUp;
