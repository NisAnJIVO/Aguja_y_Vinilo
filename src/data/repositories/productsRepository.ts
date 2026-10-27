import { MOCK_TURNTABLES } from "../mock-hardware";
import { MOCK_SLEEVES } from "../mock-sleeves";
import { MOCK_FURNITURE } from "../mock-furniture";
import { Turntable, SleeveAndCare, Furniture } from "../types";

export class ProductsRepository {
  static async getTurntables(): Promise<Turntable[]> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return [...MOCK_TURNTABLES];
  }

  static async getTurntableBySlug(slug: string): Promise<Turntable | null> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return MOCK_TURNTABLES.find((t) => t.slug === slug) || null;
  }

  static async getSleeves(): Promise<SleeveAndCare[]> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return [...MOCK_SLEEVES];
  }

  static async getSleeveBySlug(slug: string): Promise<SleeveAndCare | null> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return MOCK_SLEEVES.find((s) => s.slug === slug) || null;
  }

  static async getFurniture(): Promise<Furniture[]> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return [...MOCK_FURNITURE];
  }

  static async getFurnitureBySlug(slug: string): Promise<Furniture | null> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return MOCK_FURNITURE.find((f) => f.slug === slug) || null;
  }
}
