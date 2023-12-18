"use server";

import { revalidatePath } from "next/cache";

import { api } from "../../../../../trpc/server";

import type { RegisterDeviceInput } from "../../../../../utils/validation/types";

export const deleteDevice = async () => {
  const response = await api.user.unregisterDevice.mutate();
  revalidatePath("/dashboard/device");
  return response;
};

export const registerDevice = async (data: RegisterDeviceInput) => {
  const response = await api.user.registerDevice.mutate(data);
  revalidatePath("/dashboard/device");
  return response;
};
