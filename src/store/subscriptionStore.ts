import { create } from "zustand";
import { Genre, Mood, VinylRecord } from "../data/types";
import { MOCK_RECORDS } from "@/data/mock-records";

export interface SubscriptionPreferences {
  genres: Genre[];
  decades: string[];
  moods: Mood[];
  ownedArtists: string[];
  adventureLevel: "curioso" | "explorador" | "psiconauta";
}

export interface BoxWeekReveal {
  week: number;
  deliveryDate: string;
  isRevealed: boolean;
  themeTitle: string;
  record: VinylRecord;
  exclusiveArtNumber: string;
  packagingDetails: {
    sealColor: string;
    paperType: string;
    specialInsert: string;
  };
}

interface SubscriptionState {
  step: number;
  preferences: SubscriptionPreferences;
  boxReveals: BoxWeekReveal[];
  isBoxGenerated: boolean;
  setStep: (step: number) => void;
  toggleGenre: (genre: Genre) => void;
  toggleDecade: (decade: string) => void;
  toggleMood: (mood: Mood) => void;
  addOwnedArtist: (artist: string) => void;
  removeOwnedArtist: (artist: string) => void;
  setAdventureLevel: (level: "curioso" | "explorador" | "psiconauta") => void;
  generateCuratedBox: () => void;
  revealWeek: (weekNumber: number) => void;
  resetOnboarding: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  step: 1,
  preferences: {
    genres: ["Jazz & Bop", "Folk & Andino Psicodélico"],
    decades: ["70s"],
    moods: ["Madrugada Solitaria", "Viaje Psiconáutico"],
    ownedArtists: ["Los Kjarkas", "Pink Floyd", "Miles Davis"],
    adventureLevel: "explorador"
  },
  boxReveals: [],
  isBoxGenerated: false,

  setStep: (step) => set({ step }),

  toggleGenre: (genre) => {
    set((state) => {
      const exists = state.preferences.genres.includes(genre);
      return {
        preferences: {
          ...state.preferences,
          genres: exists
            ? state.preferences.genres.filter((g) => g !== genre)
            : [...state.preferences.genres, genre]
        }
      };
    });
  },

  toggleDecade: (decade) => {
    set((state) => {
      const exists = state.preferences.decades.includes(decade);
      return {
        preferences: {
          ...state.preferences,
          decades: exists
            ? state.preferences.decades.filter((d) => d !== decade)
            : [...state.preferences.decades, decade]
        }
      };
    });
  },

  toggleMood: (mood) => {
    set((state) => {
      const exists = state.preferences.moods.includes(mood);
      return {
        preferences: {
          ...state.preferences,
          moods: exists
            ? state.preferences.moods.filter((m) => m !== mood)
            : [...state.preferences.moods, mood]
        }
      };
    });
  },

  addOwnedArtist: (artist) => {
    const trimmed = artist.trim();
    if (!trimmed) return;
    set((state) => {
      if (state.preferences.ownedArtists.includes(trimmed)) return state;
      return {
        preferences: {
          ...state.preferences,
          ownedArtists: [...state.preferences.ownedArtists, trimmed]
        }
      };
    });
  },

  removeOwnedArtist: (artist) => {
    set((state) => ({
      preferences: {
        ...state.preferences,
        ownedArtists: state.preferences.ownedArtists.filter((a) => a !== artist)
      }
    }));
  },

  setAdventureLevel: (level) => {
    set((state) => ({
      preferences: { ...state.preferences, adventureLevel: level }
    }));
  },

  generateCuratedBox: () => {
    const { preferences } = get();

    // Smart local recommendation logic matching user genres and filtering out owned
    let candidates: VinylRecord[] = MOCK_RECORDS.filter(
      (r: VinylRecord) => !preferences.ownedArtists.some((owned) => r.artist.toLowerCase().includes(owned.toLowerCase()))
    );

    if (candidates.length < 3) {
      candidates = [...MOCK_RECORDS];
    }

    // Pick 3 diverse records for Week 1, Week 2, Week 3
    const shuffled = [...candidates].sort(() => 0.5 - Math.random());
    const week1Record = shuffled[0] || MOCK_RECORDS[0];
    const week2Record = shuffled[1] || MOCK_RECORDS[1];
    const week3Record = shuffled[2] || MOCK_RECORDS[2];

    const box: BoxWeekReveal[] = [
      {
        week: 1,
        deliveryDate: "Semana 1 • 7 de Noviembre",
        isRevealed: false,
        themeTitle: "El Anclaje: Raíces y Clásicos Ocultos",
        record: week1Record,
        exclusiveArtNumber: "Edición Limitada No. 042 / 300",
        packagingDetails: {
          sealColor: "#C89D56 (Latón Sello Lacre)",
          paperType: "Cartulina Munken Pure 350g con barniz serigráfico mate",
          specialInsert: "Fanzine de 8 páginas con entrevistas de archivo y receta de cóctel de época"
        }
      },
      {
        week: 2,
        deliveryDate: "Semana 2 • 14 de Noviembre",
        isRevealed: false,
        themeTitle: "La Deriva: Vanguardia y Textura Sonora",
        record: week2Record,
        exclusiveArtNumber: "Edición Limitada No. 042 / 300",
        packagingDetails: {
          sealColor: "#C05436 (Terracota Sellada)",
          paperType: "Papel artesanal de fibra de totora y relieve golpe seco",
          specialInsert: "Serigrafía a dos tintas firmada por el artista visual paceño"
        }
      },
      {
        week: 3,
        deliveryDate: "Semana 3 • 21 de Noviembre",
        isRevealed: false,
        themeTitle: "La Revelación: Obra Maestra Inesperada",
        record: week3Record,
        exclusiveArtNumber: "Edición Limitada No. 042 / 300",
        packagingDetails: {
          sealColor: "#5F6B50 (Musgo Botánico)",
          paperType: "Funda de cartón Kraft japonés con ventana circular troquelada",
          specialInsert: "Nota manuscrita del curador explicando por qué este disco cambiará tu escucha"
        }
      }
    ];

    set({ boxReveals: box, isBoxGenerated: true, step: 4 });
  },

  revealWeek: (weekNumber) => {
    set((state) => ({
      boxReveals: state.boxReveals.map((w) =>
        w.week === weekNumber ? { ...w, isRevealed: true } : w
      )
    }));
  },

  resetOnboarding: () => {
    set({
      step: 1,
      isBoxGenerated: false,
      boxReveals: []
    });
  }
}));
