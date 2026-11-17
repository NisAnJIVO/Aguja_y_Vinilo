import { create } from "zustand";
import { CartItem } from "../data/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (item, quantity = 1) => {
    set((state) => {
      // Validación estricta: Solo se permite 1 suscripción activa como máximo en el carrito
      if (item.type === "subscription" || item.id === "sub-miembro-plus") {
        const withoutSub = state.items.filter(
          (i) => i.id !== "sub-miembro-plus" && i.type !== "subscription"
        );
        return {
          items: [{ ...item, quantity: 1 }, ...withoutSub],
          isOpen: true,
        };
      }

      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
          ),
          isOpen: true,
        };
      }
      return {
        items: [...state.items, { ...item, quantity }],
        isOpen: true,
      };
    });
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    }));
  },

  updateQuantity: (id, delta) => {
    set((state) => ({
      items: state.items
        .map((i) => {
          if (i.id === id) {
            // Una suscripción no puede multiplicarse: si se resta se elimina, si se suma se mantiene en 1
            if (i.type === "subscription" || i.id === "sub-miembro-plus") {
              return delta < 0 ? null : { ...i, quantity: 1 };
            }
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[],
    }));
  },

  clearCart: () => set({ items: [] }),

  getSubtotal: () => {
    return get().items.reduce((acc, item) => acc + item.priceBs * item.quantity, 0);
  },

  getTotalItems: () => {
    return get().items.reduce((acc, item) => acc + item.quantity, 0);
  }
}));
