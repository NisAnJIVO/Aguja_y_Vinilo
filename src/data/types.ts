export type Genre =
  | "Rock Progresivo & Psicodelia"
  | "Jazz & Bop"
  | "Folk & Andino Psicodélico"
  | "Funk & Soul"
  | "Electrónica & Ambient"
  | "Bossa Nova & MPB"
  | "Post-Punk & Wave";

export type Mood =
  | "Madrugada Solitaria"
  | "Concentración Profunda"
  | "Celebración Cálida"
  | "Nostalgia Dorada"
  | "Viaje Psiconáutico"
  | "Domingo Lento";

export type VinylFormat =
  | "12\" LP 180g"
  | "Doble LP Gatefold"
  | "7\" Single"
  | "Edición Especial Audiófila";

export interface CoverPalette {
  bg: string;
  text: string;
  accent: string;
  geometry: "radial" | "minimal" | "bauhaus" | "constructivist" | "wave" | "retro-lens" | "duotone" | "organic";
}

export interface Track {
  side: "A" | "B" | "C" | "D";
  position: string;
  title: string;
  duration: string;
}

export interface VinylRecord {
  id: string;
  slug: string;
  title: string;
  artist: string;
  year: number;
  decade: "60s" | "70s" | "80s" | "90s" | "2000s" | "Actual";
  genre: Genre;
  mood: Mood;
  format: VinylFormat;
  speed: "33 ⅓ RPM" | "45 RPM";
  weight: "180g" | "140g" | "200g";
  priceBs: number;
  stock: number;
  coverPalette: CoverPalette;
  coverImage: string;
  description: string;
  curatorNote: string;
  label: string;
  catalogNumber: string;
  matrixCode: string;
  country: string;
  tracklist: Track[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isStaffPick?: boolean;
  bpm?: number;
  keySignature?: string;
}

export interface Turntable {
  id: string;
  slug: string;
  name: string;
  brand: string;
  priceBs: number;
  driveType: string;
  cartridge: string;
  chassis: string;
  speeds: string;
  description: string;
  features: string[];
  image: string;
  specs: Record<string, string>;
  isStaffPick?: boolean;
}

export interface SleeveAndCare {
  id: string;
  slug: string;
  name: string;
  category: "Fundas Exteriores" | "Fundas Interiores" | "Limpieza y Cuidado" | "Accesorios de Brazo";
  priceBs: number;
  packSize: string;
  material: string;
  description: string;
  features: string[];
  image: string;
}

export interface Furniture {
  id: string;
  slug: string;
  name: string;
  capacity: string;
  wood: string;
  priceBs: number;
  dimensions: string;
  leadTime: string;
  description: string;
  features: string[];
  image: string;
}

export interface CuratedLibrary {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  curator: string;
  recordCount: number;
  mood: Mood;
  genreFocus: string;
  palette: {
    bg: string;
    accent: string;
  };
  recordIds: string[];
}

export interface CartItem {
  id: string;
  type: "vinyl" | "turntable" | "sleeve" | "furniture" | "subscription";
  title: string;
  subtitle: string;
  priceBs: number;
  quantity: number;
  imageOrCover?: string | CoverPalette;
}

export interface SubscriptionBoxReveal {
  week: number;
  theme: string;
  unveiledDate: string;
  record: VinylRecord;
  exclusiveArtDetails: {
    screenprintColor: string;
    limitedEditionNumber: string;
    linerNotesAuthor: string;
  };
}
