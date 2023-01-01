import Link from "next/link";
import { useCallback } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema } from "src/utils/validation";
import type { Login } from "src/utils/types";
import { Input } from "src/components/Input/Input";
import GithubIcon from "public/svg/social/github.svg";
import TwitterIcon from "public/svg/social/twitter.svg";
import FacebookIcon from "public/svg/social/fb.svg";

export const LoginView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit = useCallback(async (data: Login) => {
    await signIn("credentials", { ...data, callbackUrl: "/dashboard" });
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-start  py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img
              className="h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Log in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              to begin your journey 🚀
            </p>
          </div>

          <div className="mt-8">
            <div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Sign in with
                </p>

                <div className="mt-1 grid grid-cols-3 gap-3">
                  <div>
                    <a
                      href="#"
                      className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with Facebook</span>
                      <FacebookIcon className="h-5 w-5" />
                    </a>
                  </div>

                  <div>
                    <a
                      href="#"
                      className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with Twitter</span>
                      <TwitterIcon className="h-5 w-5" />
                    </a>
                  </div>

                  <div>
                    <a
                      href="#"
                      className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with GitHub</span>
                      <GithubIcon className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative mt-6">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Input
                    type="email"
                    {...register("email")}
                    isError={!!errors.email?.message}
                  >
                    Email Address
                  </Input>
                  {errors.email?.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email?.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    type="password"
                    {...register("password")}
                    isError={!!errors.password?.message}
                  >
                    Password
                  </Input>
                  {errors.password?.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.password?.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end">
                  <div className="text-sm">
                    Don&apos;t have an account yet?
                    <Link
                      href="/register"
                      className="pl-2 font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Sign up!
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
};
