"use server";

import { revalidatePath } from "next/cache";

import { api } from "@/trpc/server";
import type { ProfileData } from "@/types/settings.types";

export const updateUser = async (data: ProfileData) => {
  const response = await api.user.updateUser.mutate(data);
  revalidatePath("/dashboard/settings/profile");
  return response;
};
