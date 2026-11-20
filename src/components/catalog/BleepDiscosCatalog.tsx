"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import { DISCOS_CATALOG, DiscoItem } from "@/data/discosData";
import { BleepVinylCard } from "./BleepVinylCard";
import { DiscosListView } from "./DiscosListView";
import { useLanguage } from "@/context/LanguageContext";
import { useSearchStore } from "@/store/searchStore";
import { X, LayoutGrid, List, Search } from "lucide-react";
import { ScrambleText } from "@/components/ui/ScrambleText";

export const GENRE_CATEGORIES = [
  "TODOS",
  "ROCK & CLÁSICOS",
  "INDIE & ALTERNATIVE",
  "POP & SOUL",
  "JAZZ & CITY POP",
  "LATINO & ESPAÑOL",
] as const;

export type GenreCategory = (typeof GENRE_CATEGORIES)[number];

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "year-desc"
  | "year-asc"
  | "artist-asc";

export function getDiscoGenre(item: DiscoItem): GenreCategory {
  const idNum = parseInt(item.id.replace("disco-", ""), 10);
  if ([2, 7, 13, 14, 15, 23, 24, 25, 27, 28, 29, 36, 42, 44, 46].includes(idNum)) {
    return "ROCK & CLÁSICOS";
  }
  if ([1, 3, 5, 6, 8, 12, 19, 21, 22, 34, 38, 41, 43, 47].includes(idNum)) {
    return "INDIE & ALTERNATIVE";
  }
  if ([4, 11, 16, 17, 26, 32, 33, 35, 37, 45, 48].includes(idNum)) {
    return "POP & SOUL";
  }
  if ([9, 18, 30, 31, 39].includes(idNum)) {
    return "JAZZ & CITY POP";
  }
  return "LATINO & ESPAÑOL";
}

export const BleepDiscosCatalog: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const { searchQuery, setSearchQuery, clearSearch } = useSearchStore();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedGenre, setSelectedGenre] = useState<GenreCategory>("TODOS");
  const [selectedSort, setSelectedSort] = useState<SortOption>("featured");
  const [mounted, setMounted] = useState(false);
  const catalogContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const urlQuery = searchParams.get("q")?.trim() || "";
  const activeSearch = mounted ? searchQuery.trim() : "";
  const q = (activeSearch || urlQuery).trim();

  // Filtrado y ordenamiento en tiempo real
  const processedDiscos = useMemo(() => {
    let list = [...DISCOS_CATALOG];

    if (selectedGenre !== "TODOS") {
      list = list.filter((item) => getDiscoGenre(item) === selectedGenre);
    }

    if (q) {
      const lower = q.toLowerCase();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(lower) ||
          item.artist.toLowerCase().includes(lower) ||
          item.song.toLowerCase().includes(lower) ||
          item.format.toLowerCase().includes(lower) ||
          String(item.year).includes(lower)
      );
    }

    switch (selectedSort) {
      case "price-asc":
        list.sort((a, b) => a.priceBs - b.priceBs);
        break;
      case "price-desc":
        list.sort((a, b) => b.priceBs - a.priceBs);
        break;
      case "year-desc":
        list.sort((a, b) => b.year - a.year);
        break;
      case "year-asc":
        list.sort((a, b) => a.year - b.year);
        break;
      case "artist-asc":
        list.sort((a, b) => a.artist.localeCompare(b.artist));
        break;
      default:
        break;
    }

    return list;
  }, [selectedGenre, selectedSort, q]);

  // Transición rápida stagger (0.04s) al filtrar o cambiar vista
  useEffect(() => {
    if (!mounted || !catalogContentRef.current) return;

    const cards = catalogContentRef.current.querySelectorAll(".vinyl-grid-card, .discos-list-row");
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
          stagger: 0.04,
          clearProps: "y,opacity",
        }
      );
    }
  }, [selectedGenre, selectedSort, q, viewMode, mounted]);

  const handleClear = () => {
    clearSearch();
    setSelectedGenre("TODOS");
    setSelectedSort("featured");
    router.push("/discos");
  };

  const isEn = language === "en";

  return (
    <div className="w-full bg-[#EDEDED] text-black">
      {/* =========================================================================
          ENCABEZADO SOBRIO CON TÍTULO Y CONTADOR DINÁMICO DISCRETO
         ========================================================================= */}
      <header className="w-full max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 flex items-end justify-between border-b border-black/10 select-none">
        <div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#111111]">
            {isEn ? "Records" : "Discos"}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-neutral-600 font-light mt-1">
            {isEn
              ? "Audiophile pressings, original releases and limited vinyl editions."
              : "Prensados audiófilos, ediciones originales y vinilos sellados de colección."}
          </p>
        </div>

        {/* Contador dinámico discreto */}
        <span className="font-mono text-xs sm:text-sm text-neutral-600 tracking-wider">
          {processedDiscos.length} {isEn ? "editions" : "ediciones"}
        </span>
      </header>

      {/* =========================================================================
          BARRA DE FILTROS STICKY DEBAJO DEL HEADER
         ========================================================================= */}
      <nav
        aria-label="Filtros del catálogo"
        className="sticky top-[68px] z-40 w-full bg-[#0E0E0E]/95 backdrop-blur-md text-white border-b border-white/15 shadow-sm select-none"
      >
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* LADO IZQUIERDO: GÉNEROS */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
            {GENRE_CATEGORIES.map((genre) => {
              const isActive = selectedGenre === genre;
              return (
                <button
                  key={genre}
                  type="button"
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-3 py-1 font-mono text-[11px] uppercase tracking-wider rounded-none whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? "bg-white text-black font-bold"
                      : "bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10"
                  }`}
                >
                  {genre}
                </button>
              );
            })}
          </div>

          {/* LADO DERECHO: ORDEN, BUSCADOR DE LÍNEA INFERIOR & SELECTOR DE VISTA */}
          <div className="flex items-center flex-wrap sm:flex-nowrap gap-3 shrink-0">
            {/* Buscador minimalista de línea inferior */}
            <div className="relative flex items-center border-b border-white/40 focus-within:border-white pb-0.5 sm:w-44 md:w-52 transition-colors">
              <Search className="w-3.5 h-3.5 text-neutral-400 mr-2 shrink-0 pointer-events-none" />
              <input
                type="text"
                value={q}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar artista o álbum..."
                className="w-full bg-transparent text-xs font-mono text-white placeholder-neutral-500 focus:outline-none"
              />
              {q && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-neutral-400 hover:text-white p-0.5 cursor-pointer ml-1"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Selector de orden */}
            <div className="relative shrink-0">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as SortOption)}
                aria-label="Ordenar catálogo"
                className="bg-white/5 border border-white/15 hover:border-white/30 text-neutral-200 text-xs font-mono py-1 px-2.5 rounded-none focus:outline-none focus:border-white cursor-pointer uppercase tracking-wider"
              >
                <option value="featured" className="bg-neutral-900 text-white">Orden: Destacados</option>
                <option value="price-asc" className="bg-neutral-900 text-white">Precio: Menor a Mayor</option>
                <option value="price-desc" className="bg-neutral-900 text-white">Precio: Mayor a Menor</option>
                <option value="year-desc" className="bg-neutral-900 text-white">Año: Más Recientes</option>
                <option value="year-asc" className="bg-neutral-900 text-white">Año: Clásicos</option>
                <option value="artist-asc" className="bg-neutral-900 text-white">Artista: A - Z</option>
              </select>
            </div>

            {/* Selector de vista: GRILLA / LISTA */}
            <div className="inline-flex items-center border border-white/20 p-0.5 bg-black/40 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="Vista Grilla"
                className={`px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-black font-bold"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <LayoutGrid className="w-3 h-3" />
                <span className="hidden sm:inline"><ScrambleText text="GRILLA" /></span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-label="Vista Lista"
                className={`px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer ${
                  viewMode === "list"
                    ? "bg-white text-black font-bold"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <List className="w-3 h-3" />
                <span className="hidden sm:inline"><ScrambleText text="LISTA" /></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* =========================================================================
          CONTENIDO DEL CATÁLOGO
         ========================================================================= */}
      <section className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 text-black">
        <div className="w-full max-w-[1780px] mx-auto overflow-hidden">
          {/* Grilla o Lista */}
          <div ref={catalogContentRef}>
            {processedDiscos.length === 0 ? (
              <div className="bg-white p-12 text-center border border-black/10 my-8">
                <p className="font-serif text-lg text-neutral-800 mb-2">
                  No se encontraron vinilos para este criterio
                </p>
                <p className="text-xs font-mono text-neutral-500 mb-6">
                  Intenta cambiar el género o busca por otro término.
                </p>
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-4 py-2 bg-black text-white font-mono text-xs uppercase cursor-pointer"
                >
                  Ver Todo el Catálogo
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="group/grid grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-x-3.5 sm:gap-x-4 lg:gap-x-5 gap-y-8 sm:gap-y-10">
                {processedDiscos.map((item) => (
                  <BleepVinylCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <DiscosListView items={processedDiscos} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
