"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { memo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { onPromise } from "../../../../utils";
import { createFeedSchema } from "../../../../utils/validation/schema";
import { Button } from "../../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../ui/form";
import { Input } from "../../../ui/input";

import { createFeed } from "./actions/actions";

import type { CreateFeedInput } from "../../../../utils/validation/types";
import type { DialogProps } from "@radix-ui/react-dialog";
import type { TRPCError } from "@trpc/server";

type AddFeedDialogProps = DialogProps;

export const AddFeedDialog = memo<AddFeedDialogProps>(
  ({ children, ...props }) => {
    const form = useForm<CreateFeedInput>({
      resolver: zodResolver(createFeedSchema),
    });

    const onSubmit = async (data: CreateFeedInput) => {
      await toast.promise(createFeed(data), {
        loading: "Adding feed...",
        success: ({ message }) => message,
        error: (err: TRPCError | Error) => err.message,
      });
    };

    return (
      <Dialog {...props}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="space-y-2 sm:max-w-[475px]">
          <DialogHeader>
            <DialogTitle>Add feed and always be on track!</DialogTitle>
            <DialogDescription>
              Pass an url to requested feed or upload via file.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex flex-col gap-2"
              onSubmit={onPromise(form.handleSubmit(onSubmit))}
            >
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Pass feed url here..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <div className="flex w-full items-center gap-3">
              <span className="text-sm">or</span>
              <Input type="file" className="cursor-pointer" aria-invalid />
            </div> */}

              <DialogFooter className="mt-4">
                <Button disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  },
);

AddFeedDialog.displayName = "AddFeedDialog";
