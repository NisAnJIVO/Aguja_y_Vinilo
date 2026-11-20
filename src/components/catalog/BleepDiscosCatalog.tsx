"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import { DISCOS_CATALOG } from "@/data/discosData";
import { BleepVinylCard } from "./BleepVinylCard";
import { DiscosListView } from "./DiscosListView";
import { useLanguage } from "@/context/LanguageContext";
import { useSearchStore } from "@/store/searchStore";
import { X, LayoutGrid, List } from "lucide-react";

export const BleepDiscosCatalog: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const { searchQuery, clearSearch } = useSearchStore();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mounted, setMounted] = useState(false);
  const catalogContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const urlQuery = searchParams.get("q")?.trim() || "";
  const activeSearch = mounted ? searchQuery.trim() : "";
  const q = (activeSearch || urlQuery).trim();

  // Animación Stagger con Clip-Path vertical al cargar o cambiar de filtro / vista
  useEffect(() => {
    if (viewMode === "grid" && mounted && catalogContentRef.current) {
      const cards = catalogContentRef.current.querySelectorAll(".vinyl-grid-card");
      if (cards.length > 0) {
        gsap.killTweensOf(cards);
        gsap.fromTo(
          cards,
          {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            opacity: 0,
            y: 32,
          },
          {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: {
              amount: 0.38,
              from: "start",
            },
            clearProps: "clipPath,y",
          }
        );
      }
    }
  }, [viewMode, q, mounted]);

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

          <div className="flex flex-wrap items-center gap-3">
            {mounted && q && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-white rounded font-mono text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>{t.discos.clearFilter}</span>
              </button>
            )}

            {/* SELECTOR BRUTALISTA DE VISTA: GRILLA / LISTA */}
            <div className="inline-flex items-center border border-black p-0.5 bg-white shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="Vista Grilla"
                className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-black text-white font-semibold"
                    : "text-neutral-700 hover:text-black hover:bg-neutral-100"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">VISTA GRILLA</span>
                <span className="sm:hidden">GRILLA</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-label="Vista Lista"
                className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === "list"
                    ? "bg-black text-white font-semibold"
                    : "text-neutral-700 hover:text-black hover:bg-neutral-100"
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">VISTA LISTA</span>
                <span className="sm:hidden">LISTA</span>
              </button>
            </div>
          </div>
        </div>

        {/* CONTENEDOR DEL CATÁLOGO VINCULADO A GSAP STAGGER & FOCUS MODE */}
        <div ref={catalogContentRef}>
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
              ) : viewMode === "grid" ? (
                <div className="group/grid grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-x-3.5 sm:gap-x-4 lg:gap-x-5 gap-y-8 sm:gap-y-10">
                  {filteredDiscos.map((item) => (
                    <BleepVinylCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <DiscosListView items={filteredDiscos} />
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
                {viewMode === "grid" ? (
                  <div className="group/grid grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-x-3.5 sm:gap-x-4 lg:gap-x-5 gap-y-8 sm:gap-y-10">
                    {section1.map((item) => (
                      <BleepVinylCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <DiscosListView items={section1} />
                )}
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
                {viewMode === "grid" ? (
                  <div className="group/grid grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-x-3.5 sm:gap-x-4 lg:gap-x-5 gap-y-8 sm:gap-y-10">
                    {section2.map((item) => (
                      <BleepVinylCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <DiscosListView items={section2} />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
