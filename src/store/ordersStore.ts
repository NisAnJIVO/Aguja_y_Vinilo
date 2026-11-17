import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OrderItem {
  id: string;
  title: string;
  subtitle?: string;
  priceBs: number;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: number;
  fechaFormatted: string;
  total: number;
  itemsCount: number;
  ciudad: string;
  direccion: string;
  telefono: string;
  items: OrderItem[];
  guia: string;
  transporte: string;
}

export interface OrderTrackingStatus {
  step: 1 | 2 | 3 | 4;
  statusName: string;
  statusDescription: string;
  elapsedMinutes: number;
  nextStepInMinutes: number | null;
}

/**
 * Reglas de simulación realista por temporizador:
 * - < 10 min: Confirmado (pago verificado)
 * - 10 a 30 min: Embalando (cartón rígido listo)
 * - 30 min a 24 horas (1440 min): En Camino (despacho de encomienda)
 * - > 24 horas: Entregado (en destino)
 */
export function computeOrderStatus(createdAt: number, now = Date.now()): OrderTrackingStatus {
  const elapsedMinutes = Math.max(0, (now - createdAt) / (1000 * 60));

  if (elapsedMinutes < 10) {
    return {
      step: 1,
      statusName: "Confirmado",
      statusDescription: "Pago verificado con éxito",
      elapsedMinutes,
      nextStepInMinutes: Math.ceil(10 - elapsedMinutes),
    };
  } else if (elapsedMinutes < 30) {
    return {
      step: 2,
      statusName: "Embalando",
      statusDescription: "Cartón rígido listo y sellado",
      elapsedMinutes,
      nextStepInMinutes: Math.ceil(30 - elapsedMinutes),
    };
  } else if (elapsedMinutes < 1440) {
    return {
      step: 3,
      statusName: "En Camino",
      statusDescription: "Despacho en encomienda nacional",
      elapsedMinutes,
      nextStepInMinutes: Math.ceil(1440 - elapsedMinutes),
    };
  } else {
    return {
      step: 4,
      statusName: "Entregado",
      statusDescription: "Entregado satisfactoriamente en destino",
      elapsedMinutes,
      nextStepInMinutes: null,
    };
  }
}

interface OrdersState {
  orders: Order[];
  addOrder: (
    newOrderData: Omit<Order, "createdAt" | "fechaFormatted" | "guia" | "transporte"> & {
      createdAt?: number;
      guia?: string;
      transporte?: string;
    }
  ) => Order;
  getOrderById: (id: string) => Order | undefined;
  clearOrders: () => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (data) => {
        const now = data.createdAt || Date.now();
        const dateObj = new Date(now);
        const fechaFormatted = dateObj.toLocaleDateString("es-ES", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        const numericCode = data.id.replace(/[^0-9]/g, "") || `${Math.floor(100000 + Math.random() * 900000)}`;
        const orderId = data.id.startsWith("AV-") ? data.id : `AV-${data.id}`;

        const createdOrder: Order = {
          id: orderId,
          createdAt: now,
          fechaFormatted,
          total: data.total,
          itemsCount: data.itemsCount,
          ciudad: data.ciudad || "Sucre",
          direccion: data.direccion || "Dirección en Sucre",
          telefono: data.telefono || "+591 68610314",
          items: data.items || [],
          guia: data.guia || `BOL-${numericCode}`,
          transporte: data.transporte || "Transporte & Encomienda Expresa",
        };

        set((state) => ({
          orders: [createdOrder, ...state.orders.filter((o) => o.id !== createdOrder.id)],
        }));

        return createdOrder;
      },

      getOrderById: (id: string) => {
        const clean = id.trim().toUpperCase();
        const formatted = clean.startsWith("AV-") ? clean : `AV-${clean}`;
        return get().orders.find((o) => o.id.toUpperCase() === formatted);
      },

      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: "aguja-y-vinilo-orders-storage",
    }
  )
);

