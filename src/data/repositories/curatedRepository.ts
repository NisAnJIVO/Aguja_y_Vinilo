import { MOCK_CURATED_LIBRARIES } from "../mock-curated";
import { MOCK_RECORDS } from "../mock-records";
import { CuratedLibrary, VinylRecord } from "../types";

export class CuratedRepository {
  static async getAll(): Promise<CuratedLibrary[]> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return [...MOCK_CURATED_LIBRARIES];
  }

  static async getBySlug(slug: string): Promise<{ library: CuratedLibrary; records: VinylRecord[] } | null> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    const lib = MOCK_CURATED_LIBRARIES.find((l) => l.slug === slug);
    if (!lib) return null;

    const records = MOCK_RECORDS.filter((r) => lib.recordIds.includes(r.id));
    return { library: lib, records };
  }
}
