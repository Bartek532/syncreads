"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SYNC_DEFAULT_FOLDER } from "@rssmarkable/shared";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { supabase } from "../../../lib/supabase/client";
import {
  registerUserSchema,
  type RegisterData,
} from "../../../types/auth.types";
import { onPromise } from "../../../utils/functions";
import { Button } from "../../common/Button";
import { Input } from "../../common/Input";

export const RegisterForm = memo(() => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<RegisterData>({
    resolver: zodResolver(registerUserSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    const loadingToast = toast.loading("Registering...");
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          folder: SYNC_DEFAULT_FOLDER,
        },
      },
    });

    if (error) {
      return toast.error(error.message, { id: loadingToast });
    }

    toast.success("Successfully registered!", { id: loadingToast });
    return router.push("/dashboard");
  };

  return (
    <form className="space-y-6" onSubmit={onPromise(handleSubmit(onSubmit))}>
      <Input name="name" control={control}>
        Name
      </Input>
      <Input type="email" control={control} name="email">
        Email
      </Input>
      <Input type="password" control={control} name="password">
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
  );
});

RegisterForm.displayName = "RegisterForm";
