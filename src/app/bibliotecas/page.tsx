import React from "react";
import Link from "next/link";
import { CuratedRepository } from "@/data/repositories/curatedRepository";
import { RecordsRepository } from "@/data/repositories/recordsRepository";
import { VinylDiscCover } from "@/components/ui/VinylDiscCover";
import { ArrowRight, Library } from "lucide-react";

export default async function BibliotecasPage() {
  const libraries = await CuratedRepository.getAll();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* HEADER */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5F6B50]/20 border border-[#5F6B50]/40 text-xs font-mono text-[#748363]">
          <Library className="w-3.5 h-3.5" />
          <span>CURADURÍA FÍSICA • LA LÓGICA DE PLAYLISTS EN 180G</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl text-theme-primary">
          Bibliotecas Curadas
        </h1>

        <p className="text-sm sm:text-base text-theme-secondary font-light leading-relaxed">
          En lugar de algoritmos predictivos, nuestras bibliotecas son compilaciones de discos físicos
          articuladas por músicos, historiadores y coleccionistas. Cada biblioteca reúne
          entre 4 y 5 obras fundamentales concebidas para escucharse en secuencia o acompañar
          estados de ánimo específicos.
        </p>
      </div>

      {/* LIBRARIES LISTING */}
      <div className="space-y-16">
        {libraries.map(async (lib, idx) => {
          const records = await Promise.all(
            lib.recordIds.slice(0, 3).map((id) => RecordsRepository.getById(id))
          );
          const validRecords = records.filter(Boolean);

          return (
            <div
              key={lib.id}
              className="p-8 sm:p-10 rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 hover:border-[#C89D56]/40 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-md"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Information Column */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded bg-[#C89D56]/15 text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] font-semibold">
                      Biblioteca #{idx + 1}
                    </span>
                    <span className="text-theme-muted">• {lib.mood}</span>
                    <span className="text-theme-muted">• {lib.recordCount} discos físicos</span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl text-theme-primary leading-snug">
                    {lib.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
                    {lib.description}
                  </p>

                  <div className="text-xs font-mono text-theme-muted space-y-1 border-l-2 border-[#C89D56] pl-3">
                    <span className="block text-theme-secondary font-medium">Curaduría: {lib.curator}</span>
                    <span className="block text-[11px] text-theme-muted">Foco sonoro: {lib.genreFocus}</span>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/bibliotecas/${lib.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C89D56] hover:bg-[#DDB36D] text-[#0E0E0C] font-semibold text-xs transition-transform hover:scale-105 shadow-md"
                    >
                      <span>Explorar Caja y Discos</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Visual Records Preview */}
                <div className="lg:col-span-5 flex justify-center items-center">
                  <div className="flex -space-x-12 sm:-space-x-16 hover:space-x-2 transition-all duration-500 py-4">
                    {validRecords.map((rec) => (
                      <div key={rec!.id} className="transition-transform duration-300 hover:-translate-y-2 hover:scale-105">
                        <VinylDiscCover record={rec!} size="sm" showSlideOutOnHover={false} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
