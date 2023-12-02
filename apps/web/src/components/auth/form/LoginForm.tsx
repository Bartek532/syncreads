"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { loginUserSchema, type LoginData } from "../../../types/auth.types";
import { onPromise } from "../../../utils/functions";
import { supabase } from "../../../utils/supabase/client";
import { Button } from "../../common/Button";
import { Input } from "../../common/Input";

export const LoginForm = memo(() => {
  const router = useRouter();
  const { handleSubmit, control } = useForm<LoginData>({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit = async (data: LoginData) => {
    const loadingToast = toast.loading("Signing in...");
    const { error } = await supabase.auth.signInWithPassword({
      ...data,
    });

    if (error) {
      return toast.error(error.message, { id: loadingToast });
    }

    toast.dismiss(loadingToast);
    return router.replace("/dashboard");
  };
  return (
    <form className="space-y-6" onSubmit={onPromise(handleSubmit(onSubmit))}>
      <Input type="email" name="email" control={control}>
        Email
      </Input>
      <Input type="password" name="password" control={control}>
        Password
      </Input>
      <div className="flex items-center justify-end">
        <div className="text-sm dark:text-gray-400">
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
        <Button type="submit" className="flex w-full justify-center">
          Sign in
        </Button>
      </div>
    </form>
  );
});

LoginForm.displayName = "LoginForm";
