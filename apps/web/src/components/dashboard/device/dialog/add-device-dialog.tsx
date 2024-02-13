import { zodResolver } from "@hookform/resolvers/zod";
import { GENERIC_ERROR_MESSAGE } from "@rssmarkable/shared";
import { Loader2 } from "lucide-react";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { onPromise } from "../../../../utils";
import { registerDeviceSchema } from "../../../../utils/validation/schema";
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

import { registerDevice } from "./actions";

import type { RegisterDeviceInput } from "../../../../utils/validation/types";

type AddDeviceDialog = {
  readonly children?: React.ReactNode;
};

export const AddDeviceDialog = memo<AddDeviceDialog>(({ children }) => {
  const form = useForm<RegisterDeviceInput>({
    resolver: zodResolver(registerDeviceSchema),
  });

  const onSubmit = async (data: RegisterDeviceInput) => {
    const loadingToast = toast.loading("Registering your device...");

    try {
      const response = await fetch(`/api/device/register?code=${data.code}`);
      const token = await response.text();
      const { message, success } = await registerDevice({ token });

      if (success) {
        toast.success(message, { id: loadingToast });
      } else {
        toast.error(message, { id: loadingToast });
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message, { id: loadingToast });
      } else {
        toast.error(GENERIC_ERROR_MESSAGE, {
          id: loadingToast,
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="space-y-2 sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Register device to enable sync</DialogTitle>
          <DialogDescription>
            You&apos;re one step away from enabling sync. Just pass an one-time
            code!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={onPromise(form.handleSubmit(onSubmit))}
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your one-time code..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-xs text-muted-foreground">
              You can find one-time code on{" "}
              <a
                href="https://my.remarkable.com/device/desktop/connect"
                className="font-medium underline underline-offset-4 hover:text-primary"
                target="_blank"
                rel="noreferrer"
              >
                your reMarkable account.
              </a>
            </p>

            <DialogFooter className="mt-4">
              <Button disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Register"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});

AddDeviceDialog.displayName = "AddDeviceDialog";
