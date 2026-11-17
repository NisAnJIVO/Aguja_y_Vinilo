"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DISCOS_CATALOG } from "@/data/discosData";
import { BleepVinylCard } from "./BleepVinylCard";
import { useLanguage } from "@/context/LanguageContext";
import { useSearchStore } from "@/store/searchStore";
import { X } from "lucide-react";

export const BleepDiscosCatalog: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const { searchQuery, clearSearch } = useSearchStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const urlQuery = searchParams.get("q")?.trim() || "";
  const activeSearch = mounted ? searchQuery.trim() : "";
  const q = (activeSearch || urlQuery).trim();

  const filteredDiscos = useMemo(() => {
    if (!q) return [];
    const lower = q.toLowerCase();
    return DISCOS_CATALOG.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.artist.toLowerCase().includes(lower) ||
        item.song.toLowerCase().includes(lower) ||
        item.format.toLowerCase().includes(lower)
    );
  }, [q]);

  const handleClear = () => {
    clearSearch();
    router.push("/discos");
  };

  // Sección 1: 2 filas de 8 columnas = 16 discos
  const section1 = DISCOS_CATALOG.slice(0, 16);
  // Sección 2: 3 filas de 8 columnas = 24 discos
  const section2 = DISCOS_CATALOG.slice(16, 40);

  return (
    <section suppressHydrationWarning className="w-full bg-[#EDEDED] py-10 sm:py-16 px-4 sm:px-6 lg:px-8 text-black">
      <div className="w-full max-w-[1780px] mx-auto">
        
        {/* Encabezado principal de la página */}
        <div className="mb-10 sm:mb-12 border-b border-black/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-black">
              {t.discos.title}
            </h1>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mt-2">
              {t.discos.subtitle}
            </span>
          </div>
          {mounted && q && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-white rounded font-mono text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors w-fit cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>{t.discos.clearFilter}</span>
            </button>
          )}
        </div>

        {mounted && q ? (
          <div>
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/20 pb-4">
              <div>
                <span className="font-mono text-xs uppercase text-neutral-500 block mb-1">
                  {t.discos.searchResults}
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-normal text-black">
                  &ldquo;{q}&rdquo;
                </h2>
                <span className="text-xs font-mono text-neutral-600 mt-1 block">
                  {filteredDiscos.length} {t.discos.recordsFound}
                </span>
              </div>
            </div>

            {filteredDiscos.length === 0 ? (
              <div className="bg-white p-12 text-center rounded border border-black/10 my-8">
                <p className="font-serif text-lg text-neutral-800 mb-2">
                  {t.discos.noResults}
                </p>
                <p className="text-xs font-mono text-neutral-500 mb-6">
                  Intenta buscar por artista, álbum o formato (LP, 180g, Limited).
                </p>
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-4 py-2 bg-black text-white rounded font-mono text-xs uppercase cursor-pointer"
                >
                  {t.discos.clearFilter}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-x-3.5 sm:gap-x-4 lg:gap-x-5 gap-y-8 sm:gap-y-10">
                {filteredDiscos.map((item) => (
                  <BleepVinylCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* SECCIÓN 1: BLEEP EXCLUSIVES */}
            <div className="mb-14 sm:mb-18">
              <div className="mb-6 sm:mb-8">
                <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#111111] border-b border-[#111111] pb-1 inline-block">
                  {t.discos.section1Title}
                </h2>
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 block mt-1.5">
                  {t.discos.section1Subtitle}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-x-3.5 sm:gap-x-4 lg:gap-x-5 gap-y-8 sm:gap-y-10">
                {section1.map((item) => (
                  <BleepVinylCard key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div className="w-full border-b border-gray-300 my-12 sm:my-16" />

            {/* SECCIÓN 2: LIMITED EDITIONS */}
            <div>
              <div className="mb-6 sm:mb-8">
                <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#111111] border-b border-[#111111] pb-1 inline-block">
                  {t.discos.section2Title}
                </h2>
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 block mt-1.5">
                  {t.discos.section2Subtitle}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-x-3.5 sm:gap-x-4 lg:gap-x-5 gap-y-8 sm:gap-y-10">
                {section2.map((item) => (
                  <BleepVinylCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
