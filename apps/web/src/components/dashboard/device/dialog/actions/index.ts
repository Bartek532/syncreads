"use server";

import { GENERIC_ERROR_MESSAGE } from "@rssmarkable/shared";
import { revalidatePath } from "next/cache";

import { api } from "@/trpc/server";
import type { SaveDeviceInput } from "@/utils";

export const registerDevice = async (data: SaveDeviceInput) => {
  try {
    const { message } = await api.user.registerDevice.mutate(data);
    revalidatePath("/dashboard/device");
    return { message, success: true };
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { message: e.message, success: false };
    }

    return { message: GENERIC_ERROR_MESSAGE, success: false };
  }
};

export const unregisterDevice = async () => {
  try {
    const { message } = await api.user.unregisterDevice.mutate();
    revalidatePath("/dashboard/device");
    return { message, success: true };
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { message: e.message, success: false };
    }

    return { message: GENERIC_ERROR_MESSAGE, success: false };
  }
};
