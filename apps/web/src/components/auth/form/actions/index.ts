"use server";

import { DEFAULT_USER_METADATA } from "@syncreads/shared";
import { revalidatePath } from "next/cache";

import { supabase } from "@/lib/supabase/route";
import type { LoginData, RegisterData } from "@/types/auth.types";

export const login = async (data: LoginData) => {
  const { error } = await supabase().auth.signInWithPassword({
    ...data,
  });

  return { error };
};

export const register = async (data: RegisterData) => {
  const { error } = await supabase().auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
        folder: DEFAULT_USER_METADATA.folder,
        format: DEFAULT_USER_METADATA.format,
      },
    },
  });

  return { error };
};
