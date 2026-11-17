import { create } from "zustand";

export interface ModalProduct {
  id: string | number;
  title: string;
  subtitle?: string;
  categoryLabel?: string;
  priceBs: number;
  image: string;
  description: string;
  format?: string;
  type?: "vinyl" | "turntable" | "furniture" | "sleeve" | "subscription";
}

interface ProductModalState {
  isOpen: boolean;
  product: ModalProduct | null;
  openModal: (product: ModalProduct) => void;
  closeModal: () => void;
}

export const useProductModalStore = create<ProductModalState>((set) => ({
  isOpen: false,
  product: null,
  openModal: (product) => set({ isOpen: true, product }),
  closeModal: () => set({ isOpen: false, product: null }),
}));

