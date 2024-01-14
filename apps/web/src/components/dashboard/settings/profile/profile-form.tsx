"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SYNC_DEFAULT_FOLDER } from "@rssmarkable/shared";
import { Loader2 } from "lucide-react";
import { memo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
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

import { updateUser } from "./actions/actions";

import type { User } from "@rssmarkable/database";

type ProfileForm = {
  readonly user: User;
};

export const ProfileForm = memo<ProfileForm>(({ user }) => {
  console.log(user);
  const name = getName(user);
  const form = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      ...(name ? { name } : {}),
      folder: user.user_metadata.folder ?? SYNC_DEFAULT_FOLDER,
    },
  });

  const onSubmit = async (data: ProfileData) => {
    await toast.promise(updateUser(data), {
      loading: "Updating your details...",
      success: ({ message }) => message,
      error: (err: Error) => err.message,
    });
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
          name="folder"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-1">
                <FormLabel>Folder</FormLabel>
                <FormDescription>
                  Your place on the device where content will be synced.
                </FormDescription>
              </div>
              <FormControl>
                <Input placeholder="Your sync folder" {...field} />
              </FormControl>

              <FormMessage />
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
            "Update profile"
          )}
        </Button>
      </form>
    </Form>
  );
});

ProfileForm.displayName = "ProfileForm";
