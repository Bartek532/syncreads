import { zodResolver } from "@hookform/resolvers/zod";
import { DeviceType } from "@syncreads/database";
import { GENERIC_ERROR_MESSAGE } from "@syncreads/shared";
import { AlertTriangle, Loader2 } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { DEVICE_LABEL } from "../../../../config";
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
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { Input } from "../../../ui/input";

import { registerDevice } from "./actions";
import {
  isRegisterRouteFailedResponse,
  isRegisterRouteSuccessResponse,
} from "./validation";

import type { RegisterDeviceInput } from "../../../../utils/validation/types";

type AddDeviceDialog = {
  readonly children?: React.ReactNode;
};

const register = async (data: RegisterDeviceInput) => {
  if (data.type === DeviceType.REMARKABLE) {
    const response = await fetch(`/api/device/register?code=${data.code}`);
    const result: unknown = await response.json();

    if (!response.ok) {
      if (isRegisterRouteFailedResponse(result)) {
        return { message: result.message, success: false };
      }

      return { message: GENERIC_ERROR_MESSAGE, success: false };
    }

    if (!isRegisterRouteSuccessResponse(result)) {
      return { message: GENERIC_ERROR_MESSAGE, success: false };
    }

    const token = result.token;
    return registerDevice({ token, type: data.type });
  }

  return registerDevice({ token: data.email, type: data.type });
};

export const AddDeviceDialog = memo<AddDeviceDialog>(({ children }) => {
  const form = useForm<RegisterDeviceInput>({
    resolver: zodResolver(registerDeviceSchema),
    defaultValues: {
      type: DeviceType.REMARKABLE,
    },
  });

  const type = form.watch("type");

  const onSubmit = async (data: RegisterDeviceInput) => {
    const loadingToast = toast.loading("Registering your device...");

    try {
      const { message, success } = await register(data);

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
            You&apos;re one step away from enabling sync. Just pass correct data
            below!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={onPromise(form.handleSubmit(onSubmit))}
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="mb-2 space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-5"
                    >
                      {Object.keys(DeviceType).map((type) => (
                        <FormItem
                          key={type}
                          className="flex items-center space-x-2 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={type} />
                          </FormControl>
                          <FormLabel className="cursor-pointer font-normal">
                            {DEVICE_LABEL[type as DeviceType]}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {type === DeviceType.REMARKABLE && (
              <>
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
              </>
            )}

            {type === DeviceType.KINDLE && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your email (e.g. john@kindle.com)..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="text-xs text-muted-foreground">
                  <AlertTriangle className="mr-1 inline-block w-3 text-warning-foreground" />
                  Make sure to{" "}
                  <Link
                    href="/explore/kindle#add-approved-email"
                    className="font-medium underline underline-offset-4 hover:text-primary"
                  >
                    add approved email
                  </Link>{" "}
                  before.
                </p>
              </>
            )}

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
