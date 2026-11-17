import { create } from "zustand";

interface ToastState {
  isVisible: boolean;
  productTitle: string;
  showToast: (title?: string) => void;
  hideToast: () => void;
}

let timeoutId: NodeJS.Timeout | null = null;

export const useToastStore = create<ToastState>((set) => ({
  isVisible: false,
  productTitle: "",
  showToast: (title: string = "") => {
    if (timeoutId) clearTimeout(timeoutId);
    set({ isVisible: true, productTitle: title });

    timeoutId = setTimeout(() => {
      set({ isVisible: false });
    }, 1200);
  },
  hideToast: () => {
    if (timeoutId) clearTimeout(timeoutId);
    set({ isVisible: false });
  },
}));

