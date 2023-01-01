import type { NextPage } from "next";
import Link from "next/link";
import { useCallback } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema } from "src/utils/validation";
import type { Login } from "src/utils/types";

const Home: NextPage = () => {
  const { register, handleSubmit } = useForm<Login>({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit = useCallback(async (data: Login) => {
    await signIn("credentials", { ...data, callbackUrl: "/dashboard" });
  }, []);

  return (
    <div>
      <main>
        <form
          className="flex h-screen w-full items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Welcome back!</h2>
              <input
                type="email"
                placeholder="Type your email..."
                className="input input-bordered mt-2 w-full max-w-xs"
                {...register("email")}
              />
              <input
                type="password"
                placeholder="Type your password..."
                className="input input-bordered my-2 w-full max-w-xs"
                {...register("password")}
              />
              <div className="card-actions items-center justify-between">
                <Link href="/sign-up" className="link">
                  Go to sign up
                </Link>
                <button className="btn btn-secondary" type="submit">
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Home;
