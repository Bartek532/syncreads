"use server";

import { DEFAULT_USER_METADATA } from "@syncreads/shared";

import { supabase } from "@/lib/supabase/route";
import type { LoginData, RegisterData } from "@/types/auth.types";

export const login = async (data: LoginData) => {
  const { error } = await supabase().auth.signInWithPassword({
    ...data,
  });

  return { error: error?.message ?? null };
};

export const register = async (data: RegisterData) => {
  const { error } = await supabase().auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        ...DEFAULT_USER_METADATA,
        name: data.name,
      },
    },
  });

  return { error: error?.message ?? null };
};
