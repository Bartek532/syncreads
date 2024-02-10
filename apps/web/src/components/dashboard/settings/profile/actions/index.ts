"use server";

import { GENERIC_ERROR_MESSAGE } from "@rssmarkable/shared";
import { revalidatePath } from "next/cache";

import { api } from "@/trpc/server";
import type { ProfileData } from "@/types/settings.types";

export const updateUser = async (data: ProfileData) => {
  try {
    const { message } = await api.user.updateUser.mutate(data);
    revalidatePath("/dashboard/settings/profile");
    return { message, success: true };
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { message: e.message, success: false };
    }

    return { message: GENERIC_ERROR_MESSAGE, success: false };
  }
};
