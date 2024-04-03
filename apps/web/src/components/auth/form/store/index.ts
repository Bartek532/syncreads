import { create } from "zustand";

import { AUTH_PROVIDER } from "../../../../types/auth.types";

export const useAuthFormStore = create<{
  provider: AUTH_PROVIDER;
  setProvider: (provider: AUTH_PROVIDER) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}>((set) => ({
  provider: AUTH_PROVIDER.PASSWORD,
  setProvider: (provider) => set({ provider }),
  isSubmitting: false,
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
}));
