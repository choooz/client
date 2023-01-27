import { create } from "zustand";

export interface SubmitState {
  isSubmit: boolean;
  setIsSubmit: (isSubmitting: boolean) => void;
  onToggleisSubmit: () => void;
}

export const useSubmitState = create<SubmitState>((set) => ({
  isSubmit: false,
  setIsSubmit: (isSubmit) => set({ isSubmit }),
  onToggleisSubmit: () => set((state) => ({ isSubmit: !state.isSubmit })),
}));
