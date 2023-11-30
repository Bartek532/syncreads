"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { AUTH_PROVIDER } from "../../types/auth.types";
import { onPromise } from "../../utils/functions";
import { supabase } from "../../utils/supabase/client";
import { registerUserSchema } from "../../utils/validation/schema";

import type { Register } from "../../types/auth.types";

export const RegisterView = () => {
  const router = useRouter();
  const [isFormValidated, setIsFormValidated] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValidating },
  } = useForm<Register>({
    resolver: zodResolver(registerUserSchema),
  });

  const onSubmit = async (data: Register) => {
    const loadingToast = toast.loading("Registering...");
    const { data: s, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
        },
      },
    });

    console.log(s, error);

    if (error) {
      return toast.error(error.message, { id: loadingToast });
    }

    toast.success("Successfully registered!", { id: loadingToast });
    return router.push("/login");
  };

  useEffect(() => {
    if (isValidating) {
      setIsFormValidated(true);
    }
  }, [isValidating]);

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-start  py-12 px-4 dark:bg-slate-900 sm:px-6 lg:flex-none lg:px-20 xl:px-28">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Image
              src="/android-icon-72x72.png"
              width="36"
              height="36"
              alt="rssmarkable logo"
            />{" "}
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Register to RSSmarkable
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              and always be up to date! 🔄
            </p>
          </div>

          <div className="mt-8">
            <div>
              <div className="mt-1 flex w-full flex-col items-stretch justify-center gap-2">
                {Object.values(AUTH_PROVIDER).map((provider) => {
                  const Icon = dynamic(
                    () => import(`public/svg/social/${provider}.svg`),
                  );

                  return (
                    <Button
                      key={provider}
                      variant="secondary"
                      className="inline-flex w-full justify-center gap-4 py-2.5"
                      onClick={onPromise(() =>
                        supabase.auth.signInWithOAuth({
                          provider,
                          options: {
                            redirectTo: `${window.location.origin}/dashboard`,
                          },
                        }),
                      )}
                    >
                      <span className="sr-only">Sign in with {provider}</span>

                      <div className="h-6 w-6 dark:brightness-125">
                        <Icon />
                      </div>
                      <span className="capitalize">{provider}</span>
                    </Button>
                  );
                })}
              </div>

              <div className="relative mt-6">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500 dark:bg-slate-900 dark:text-gray-400">
                    or continue with
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <form
                className="space-y-6"
                onSubmit={onPromise(handleSubmit(onSubmit))}
              >
                <Input
                  error={errors.name}
                  isValidated={isFormValidated}
                  {...register("name")}
                >
                  Name
                </Input>
                <Input
                  type="email"
                  error={errors.email}
                  isValidated={isFormValidated}
                  {...register("email")}
                >
                  Email
                </Input>
                <Input
                  type="password"
                  error={errors.password}
                  isValidated={isFormValidated}
                  {...register("password")}
                >
                  Password
                </Input>
                <div className="flex items-center justify-end">
                  <div className="text-sm dark:text-gray-400">
                    Already have an account?
                    <Link
                      href="/login"
                      className="pl-2 font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Sign in!
                    </Link>
                  </div>
                </div>
                <div>
                  <Button type="submit" className="flex w-full justify-center">
                    Sign up
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden flex-1 lg:block">
        <Image
          src="/images/entry-page-background.jpg"
          fill
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
};
