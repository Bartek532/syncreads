"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { memo } from "react";
import { useForm } from "react-hook-form";

import { onPromise } from "../../../utils/functions";
import { loginUserSchema } from "../../../utils/validation/schema";
import { Button } from "../../common/Button";
import { Input } from "../../common/Input";

import type { Login } from "../../../types/auth.types";

type LoginFormProps = {
  readonly onSubmit: (data: Login) => void;
};

export const LoginForm = memo<LoginFormProps>(({ onSubmit }) => {
  const { handleSubmit, control } = useForm<Login>({
    resolver: zodResolver(loginUserSchema),
  });

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
