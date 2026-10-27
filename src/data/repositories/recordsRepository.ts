import { MOCK_RECORDS } from "../mock-records";
import { Genre, Mood, VinylFormat, VinylRecord } from "../types";

export interface RecordFilters {
  genre?: Genre | "Todos";
  decade?: string | "Todas";
  mood?: Mood | "Todos";
  format?: VinylFormat | "Todos";
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
  sortBy?: "destacados" | "precio-asc" | "precio-desc" | "año-desc" | "titulo";
}

export class RecordsRepository {
  static async getAll(filters?: RecordFilters): Promise<VinylRecord[]> {
    // Simulates an async network delay typical of real data services
    await new Promise((resolve) => setTimeout(resolve, 40));

    let results = [...MOCK_RECORDS];

    if (!filters) return results;

    if (filters.genre && filters.genre !== "Todos") {
      results = results.filter((r) => r.genre === filters.genre);
    }

    if (filters.decade && filters.decade !== "Todas") {
      results = results.filter((r) => r.decade === filters.decade);
    }

    if (filters.mood && filters.mood !== "Todos") {
      results = results.filter((r) => r.mood === filters.mood);
    }

    if (filters.format && filters.format !== "Todos") {
      results = results.filter((r) => r.format === filters.format);
    }

    if (filters.minPrice !== undefined) {
      results = results.filter((r) => r.priceBs >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      results = results.filter((r) => r.priceBs <= filters.maxPrice!);
    }

    if (filters.searchQuery && filters.searchQuery.trim() !== "") {
      const q = filters.searchQuery.toLowerCase().trim();
      results = results.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.artist.toLowerCase().includes(q) ||
          r.genre.toLowerCase().includes(q) ||
          r.label.toLowerCase().includes(q)
      );
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "precio-asc":
          results.sort((a, b) => a.priceBs - b.priceBs);
          break;
        case "precio-desc":
          results.sort((a, b) => b.priceBs - a.priceBs);
          break;
        case "año-desc":
          results.sort((a, b) => b.year - a.year);
          break;
        case "titulo":
          results.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "destacados":
        default:
          results.sort((a, b) => (b.isStaffPick ? 1 : 0) - (a.isStaffPick ? 1 : 0));
          break;
      }
    }

    return results;
  }

  static async getBySlug(slug: string): Promise<VinylRecord | null> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    const record = MOCK_RECORDS.find((r) => r.slug === slug);
    return record || null;
  }

  static async getById(id: string): Promise<VinylRecord | null> {
    await new Promise((resolve) => setTimeout(resolve, 20));
    const record = MOCK_RECORDS.find((r) => r.id === id);
    return record || null;
  }

  static async getFeatured(): Promise<VinylRecord[]> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return MOCK_RECORDS.filter((r) => r.isFeatured);
  }

  static async getStaffPicks(): Promise<VinylRecord[]> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return MOCK_RECORDS.filter((r) => r.isStaffPick);
  }

  static async getRelated(currentId: string, genre: Genre, limit = 4): Promise<VinylRecord[]> {
    await new Promise((resolve) => setTimeout(resolve, 20));
    return MOCK_RECORDS.filter((r) => r.id !== currentId && r.genre === genre).slice(0, limit);
  }
}
