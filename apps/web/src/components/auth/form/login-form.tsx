"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  loginUserSchema,
  type LoginData,
  AUTH_PROVIDER,
} from "@/types/auth.types";
import { onPromise } from "@/utils";

import { login } from "./actions";
import { useAuthFormStore } from "./store";

export const LoginForm = memo(() => {
  const { provider, setProvider, isSubmitting, setIsSubmitting } =
    useAuthFormStore();
  const router = useRouter();
  const form = useForm<LoginData>({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit = async (data: LoginData) => {
    setProvider(AUTH_PROVIDER.PASSWORD);
    setIsSubmitting(true);

    const loadingToast = toast.loading("Signing in...");
    const { error } = await login(data);

    if (error) {
      return toast.error(error.message, { id: loadingToast });
    }

    toast.success("Signed in!", { id: loadingToast });
    setIsSubmitting(false);
    return router.replace("/dashboard");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={onPromise(form.handleSubmit(onSubmit))}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end">
          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account yet?
            <Link
              href="/auth/register"
              className="pl-2 font-medium underline underline-offset-4 hover:text-primary"
            >
              Sign up!
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting && provider === AUTH_PROVIDER.PASSWORD ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </Form>
  );
});

LoginForm.displayName = "LoginForm";
