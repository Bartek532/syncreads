import { DEFAULT_USER_METADATA } from "@syncreads/shared";

import { supabase } from "@/lib/supabase/client";
import type { LoginData, RegisterData } from "@/types/auth.types";

export const login = async (data: LoginData) => {
  const { error } = await supabase().auth.signInWithPassword({
    ...data,
  });

  return { error: error?.message ?? null };
};

export const register = async (input: RegisterData) => {
  const { error } = await supabase().auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        ...DEFAULT_USER_METADATA,
        name: input.name,
      },
    },
  });

  return { error: error?.message ?? null };
};
