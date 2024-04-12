"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { cn, onPromise } from "@/utils";

import { Button } from "../../../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../ui/form";
import { Input } from "../../../../ui/input";
import { Textarea } from "../../../../ui/textarea";
import { sendMail } from "../actions";

import { contactSchema } from "./validation";

import type { ContactInput } from "./validation";

type FormStatus = "pending" | "loading" | "fullfilled" | "rejected";

export const ContactForm = () => {
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });
  const [formStatus, setFormStatus] = useState<FormStatus>("pending");

  const onSubmit = async (data: ContactInput) => {
    setFormStatus("loading");
    try {
      await sendMail(data);
      setFormStatus("fullfilled");
    } catch {
      setFormStatus("rejected");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={onPromise(form.handleSubmit(onSubmit))}
        className="flex flex-col gap-6 sm:gap-8"
      >
        <div className="flex w-full flex-col gap-6 md:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel className="sm:text-base">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
                    {...field}
                    className={cn(
                      "sm:h-14 sm:px-6",
                      form.formState.errors.email && "sm:pr-10",
                    )}
                  />
                </FormControl>
                <FormMessage className="ml-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel className="sm:text-base">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john@doe.com"
                    {...field}
                    className={cn(
                      "sm:h-14 sm:px-6",
                      form.formState.errors.email && "sm:pr-10",
                    )}
                  />
                </FormControl>
                <FormMessage className="ml-1" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sm:text-base">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Cool stuff, thanks for it! 🎉"
                  className={cn(
                    "resize-none sm:px-6 sm:py-4",
                    form.formState.errors.email && "sm:pr-10",
                  )}
                  rows={8}
                  {...field}
                />
              </FormControl>
              <FormMessage className="ml-1" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={formStatus !== "pending"}
          className={cn(
            "sm:py-6",
            formStatus === "fullfilled" &&
              "bg-success !opacity-100 dark:text-primary",
            formStatus === "rejected" &&
              "bg-destructive !opacity-100 dark:text-primary",
          )}
        >
          {formStatus === "loading" ? (
            <Loader2 className="animate-spin" />
          ) : formStatus === "fullfilled" ? (
            "Thanks for your message!"
          ) : formStatus === "rejected" ? (
            "Oops, maybe try again later?"
          ) : (
            "Send!"
          )}
        </Button>
      </form>
    </Form>
  );
};
