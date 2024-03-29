"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DEFAULT_OPTIONS,
  OUTPUT_FORMAT,
  syncArticlePayloadSchema,
} from "@rssmarkable/shared";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { onPromise } from "../../../../../utils";
import { Button } from "../../../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../ui/form";
import { Input } from "../../../../ui/input";
import { RadioGroup, RadioGroupItem } from "../../../../ui/radio-group";
import { queueArticleSync } from "../actions";

import type { User } from "@rssmarkable/database";
import type { SyncArticleInput } from "@rssmarkable/shared";

type SyncArticleDialogProps = {
  readonly children?: React.ReactNode;
  readonly user?: User | null;
};

export const SyncArticleDialog = memo<SyncArticleDialogProps>(
  ({ children, user }) => {
    const router = useRouter();
    const form = useForm<SyncArticleInput>({
      resolver: zodResolver(syncArticlePayloadSchema),
      defaultValues: {
        ...(user
          ? {
              options: {
                format: user.user_metadata.format ?? DEFAULT_OPTIONS.format,
              },
            }
          : {}),
      },
    });

    console.log(form.getValues());

    const onSubmit = async (data: SyncArticleInput) => {
      const loadingToast = toast.loading("Queuing article sync...");

      console.log(data);

      const { message, success, sync } = await queueArticleSync(data);

      if (success) {
        toast.success(message, { id: loadingToast });
        router.push(`/dashboard/syncs/${sync.id}`);
      } else {
        toast.error(message, { id: loadingToast });
      }
    };

    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="space-y-2 sm:max-w-[475px]">
          <DialogHeader>
            <DialogTitle>Sync any article from the web!</DialogTitle>
            <DialogDescription>
              Just pass an url and we will do the rest.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex flex-col items-end gap-4"
              onSubmit={onPromise(form.handleSubmit(onSubmit))}
            >
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input {...field} placeholder="Pass url here..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Sync now"
                )}
              </Button>
              <DialogFooter className="w-full">
                <FormField
                  control={form.control}
                  name="options.format"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value ?? DEFAULT_OPTIONS.format}
                          className="flex gap-5"
                        >
                          {Object.keys(OUTPUT_FORMAT).map((type) => (
                            <FormItem
                              key={type}
                              className="flex items-center space-x-2 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem
                                  value={
                                    OUTPUT_FORMAT[
                                      type as keyof typeof OUTPUT_FORMAT
                                    ]
                                  }
                                />
                              </FormControl>
                              <FormLabel className="cursor-pointer font-normal">
                                {type}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  },
);

SyncArticleDialog.displayName = "SyncArticleDialog";
