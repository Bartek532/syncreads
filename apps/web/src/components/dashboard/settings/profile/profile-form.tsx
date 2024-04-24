"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_USER_METADATA } from "@syncreads/shared";
import { Loader2 } from "lucide-react";
import { memo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { profileSchema } from "@/types/settings.types";
import type { ProfileData } from "@/types/settings.types";
import { getName, onPromise } from "@/utils";

import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";

import { updateUser } from "./actions";
import { formats } from "./constants";

import type { User } from "@syncreads/shared";

type ProfileForm = {
  readonly user: User;
};

export const ProfileForm = memo<ProfileForm>(({ user }) => {
  const name = getName(user);
  const form = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      ...(name ? { name } : {}),
      folder: user.user_metadata.folder ?? DEFAULT_USER_METADATA.folder,
      format: user.user_metadata.format ?? DEFAULT_USER_METADATA.format,
    },
  });

  const onSubmit = async (data: ProfileData) => {
    const loadingToast = toast.loading("Updating your details...");

    const { message, success } = await updateUser(data);

    if (success) {
      toast.success(message, { id: loadingToast });
    } else {
      toast.error(message, { id: loadingToast });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={onPromise(form.handleSubmit(onSubmit))}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-1">
                <FormLabel>Name</FormLabel>
                <FormDescription>
                  This is the name that will be displayed on your profile.
                </FormDescription>
              </div>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="folder.name"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-1">
                <FormLabel>Folder</FormLabel>
                <FormDescription>
                  Specific place where content will be synced (available only on
                  reMarkable)
                </FormDescription>
              </div>

              <FormControl>
                <Input
                  placeholder="Your sync folder"
                  disabled={form.watch("folder.root")}
                  {...field}
                />
              </FormControl>

              <FormMessage />

              <FormField
                control={form.control}
                name="folder.root"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0 pt-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(e) => {
                          field.onChange(e);
                          void form.trigger("folder.name");
                        }}
                      />
                    </FormControl>
                    <FormLabel>Sync to root folder</FormLabel>
                  </FormItem>
                )}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="format"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-1">
                <FormLabel>Default format</FormLabel>
                <FormDescription>
                  Your default output format for synced content.
                </FormDescription>
              </div>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="relative flex gap-4 overflow-x-auto pt-2"
              >
                {formats.map((f) => (
                  <FormItem key={f.value}>
                    <FormLabel className="flex flex-col items-center justify-center [&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem value={f.value} className="sr-only" />
                      </FormControl>
                      <div className="w-36 cursor-pointer items-center rounded-lg border-2 border-muted p-1 hover:border-accent sm:w-48 md:w-64">
                        <f.icon />
                      </div>
                      <span className="block p-2 text-center font-normal">
                        {f.label}
                      </span>

                      <FormDescription className="max-w-36 text-center text-xs sm:max-w-48 md:max-w-64 md:text-sm">
                        {f.description}
                      </FormDescription>
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="mt-6"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Update settings"
          )}
        </Button>
      </form>
    </Form>
  );
});

ProfileForm.displayName = "ProfileForm";
