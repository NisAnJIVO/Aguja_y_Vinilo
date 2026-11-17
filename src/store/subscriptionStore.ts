import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SubscriptionProfile {
  nombre: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  generosFavoritos: string[];
  generosExcluidos: string[];
  notas: string;
  fechaInicio: string;
  proximaEntrega: string;
  entregaActual: number;
  totalEntregas: number;
}

interface SubscriptionState {
  isPlus: boolean;
  profile: SubscriptionProfile | null;
  subscribe: (data: Partial<SubscriptionProfile>) => void;
  cancelSubscription: () => void;
  updatePreferences: (
    favs: string[],
    excls: string[],
    notas: string,
    direccion?: Partial<SubscriptionProfile>
  ) => void;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      isPlus: false,
      profile: null,

      subscribe: (data) => {
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

        const newProfile: SubscriptionProfile = {
          nombre: data.nombre || "Coleccionista Aguja & Vinilo",
          ciudad: data.ciudad || "Sucre",
          direccion: data.direccion || "",
          telefono: data.telefono || "+591 68610314",
          generosFavoritos: data.generosFavoritos || [
            "Rock Clásico & Alternativo",
            "Indie Rock & Shoegaze",
          ],
          generosExcluidos: data.generosExcluidos || ["Reggaetón & Urbano Comercial"],
          notas: data.notas || "",
          fechaInicio: today.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          proximaEntrega: nextWeek.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
          }),
          entregaActual: 1,
          totalEntregas: 3,
        };

        set({
          isPlus: true,
          profile: newProfile,
        });
      },

      cancelSubscription: () => {
        set({
          isPlus: false,
          profile: null,
        });
      },

      updatePreferences: (favs, excls, notas, direccion) => {
        set((state) => ({
          profile: state.profile
            ? {
                ...state.profile,
                generosFavoritos: favs,
                generosExcluidos: excls,
                notas: notas,
                ...(direccion || {}),
              }
            : null,
        }));
      },
    }),
    {
      name: "aguja-subscription-storage",
    }
  )
);
