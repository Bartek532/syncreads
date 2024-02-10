"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { onPromise } from "../../../../../utils";
import { createFeedSchema } from "../../../../../utils/validation/schema";
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
  FormMessage,
} from "../../../../ui/form";
import { Input } from "../../../../ui/input";
import { queueArticleSync } from "../actions";

import type { CreateFeedInput } from "../../../../../utils/validation/types";

type SyncArticleDialogProps = {
  readonly children?: React.ReactNode;
};

export const SyncArticleDialog = memo<SyncArticleDialogProps>(
  ({ children }) => {
    const form = useForm<CreateFeedInput>({
      resolver: zodResolver(createFeedSchema),
    });

    const onSubmit = async (data: CreateFeedInput) => {
      const loadingToast = toast.loading("Queuing article sync...");

      const { message, success } = await queueArticleSync(data);

      if (success) {
        toast.success(message, { id: loadingToast });
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
              className="space-y-4"
              onSubmit={onPromise(form.handleSubmit(onSubmit))}
            >
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Pass url here..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button>Sync now</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  },
);

SyncArticleDialog.displayName = "SyncArticleDialog";
