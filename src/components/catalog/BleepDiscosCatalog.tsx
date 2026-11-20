"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import { DISCOS_CATALOG, DiscoItem } from "@/data/discosData";
import { BleepVinylCard } from "./BleepVinylCard";
import { DiscosListView } from "./DiscosListView";
import { useLanguage } from "@/context/LanguageContext";
import { useSearchStore } from "@/store/searchStore";
import { X, LayoutGrid, List, Search, ArrowUpDown } from "lucide-react";
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

const LATIN_ARTISTS = new Set([
  "Nsqk",
  "Maná",
  "Alejandro Sanz",
  "José José",
  "Los Temerarios",
  "Bobby Pulido",
  "Frankie Ruiz",
  "Melendi",
  "Ritchie Valens",
]);

const ROCK_ARTISTS = new Set([
  "The Beatles",
  "Black Sabbath",
  "Guns N' Roses",
  "The Animals",
  "Kansas",
  "Eric Carmen",
  "Oasis",
  "Pretenders",
  "Coldplay",
]);

const JAZZ_CITY_POP_ARTISTS = new Set([
  "Laufey",
  "Anri",
  "Lamp",
  "Erik Satie",
  "Justin Hurwitz",
  "Earth, Wind & Fire",
]);

const POP_SOUL_ARTISTS = new Set([
  "Michael Jackson",
  "ABBA",
  "Alphaville",
  "Calvin Harris",
  "OneRepublic",
  "ILLIT",
  "Suki Waterhouse",
  "Matt Maltese",
  "Tom Odell",
]);

function getDiscoGenre(item: { artist: string }): GenreCategory {
  if (LATIN_ARTISTS.has(item.artist)) return "LATINO & ESPAÑOL";
  if (ROCK_ARTISTS.has(item.artist)) return "ROCK & CLÁSICOS";
  if (JAZZ_CITY_POP_ARTISTS.has(item.artist)) return "JAZZ & CITY POP";
  if (POP_SOUL_ARTISTS.has(item.artist)) return "POP & SOUL";
  return "INDIE & ALTERNATIVE";
}

export const BleepDiscosCatalog: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
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

    // 1. Filtrar por Género
    if (selectedGenre !== "TODOS") {
      list = list.filter((item) => getDiscoGenre(item) === selectedGenre);
    }

    // 2. Filtrar por Texto de Búsqueda
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

    // 3. Ordenamiento
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
        // featured: mantiene orden curado original
        break;
    }

    return list;
  }, [selectedGenre, selectedSort, q]);

  // Transición suave (fade + ligero desplazamiento vertical) al cambiar filtros, búsqueda o vista
  useEffect(() => {
    if (mounted && catalogContentRef.current) {
      const cards = catalogContentRef.current.querySelectorAll(
        viewMode === "grid" ? ".vinyl-grid-card" : ".group"
      );
      if (cards.length > 0) {
        gsap.killTweensOf(cards);
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.38,
            ease: "power2.out",
            stagger: {
              amount: 0.22,
              from: "start",
            },
            clearProps: "y",
          }
        );
      }
    }
  }, [selectedGenre, selectedSort, q, viewMode, mounted]);

  const handleClear = () => {
    clearSearch();
    setSelectedGenre("TODOS");
    setSelectedSort("featured");
    router.push("/discos");
  };

  const visibleCount = String(processedDiscos.length).padStart(3, "0");
  const totalCount = String(DISCOS_CATALOG.length).padStart(3, "0");

  return (
    <div className="w-full bg-[#EDEDED] text-black">
      {/* =========================================================================
          BARRA STICKY DE FILTROS (GÉNEROS, ORDEN, BUSCADOR, CONTADOR & VISTA)
          Fondo oscuro con backdrop-blur y borde fino inferior de 1px a 68px del top
         ========================================================================= */}
      <nav
        aria-label="Filtros y orden del catálogo"
        className="sticky top-[68px] z-40 w-full bg-[#0E0E0E]/95 backdrop-blur-md text-white border-b border-white/15 shadow-sm select-none"
      >
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3">
          
          {/* LADO IZQUIERDO: SELECTOR DE GÉNEROS (SCROLL HORIZONTAL CÓMODO) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
            {GENRE_CATEGORIES.map((genre) => {
              const isActive = selectedGenre === genre;
              return (
                <button
                  key={genre}
                  type="button"
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-3 py-1 font-mono text-[11px] uppercase tracking-wider rounded-none whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-white text-black font-bold shadow-xs"
                      : "bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 hover:border-white/30"
                  }`}
                >
                  {genre}
                </button>
              );
            })}
          </div>

          {/* LADO DERECHO: BUSCADOR, ORDEN, CONTADOR & SELECTOR DE VISTA */}
          <div className="flex items-center flex-wrap sm:flex-nowrap gap-2 sm:gap-3 shrink-0">
            {/* Buscador integrado */}
            <div className="relative flex-1 sm:w-44 md:w-52">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                value={q}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar disco o artista..."
                className="w-full bg-white/5 border border-white/15 focus:border-white pl-8 pr-7 py-1 text-xs font-mono text-white placeholder-neutral-500 rounded-none focus:outline-none transition-colors"
              />
              {q && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-0.5 cursor-pointer"
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

            {/* Contador tipográfico monoespaciado en tiempo real */}
            <div className="font-mono text-[11px] sm:text-xs font-bold tracking-widest text-neutral-300 bg-white/5 border border-white/15 px-2.5 py-1 rounded-none select-none whitespace-nowrap shrink-0">
              <span className="text-white">{visibleCount}</span>
              <span className="text-neutral-500"> / </span>
              <span className="text-neutral-400">{totalCount}</span>
              <span className="text-neutral-500 ml-1.5 hidden xl:inline">DISCOS</span>
            </div>

            {/* Selector de vista: Grilla / Lista */}
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
          CONTENIDO DEL CATÁLOGO (CON ANIMACIÓN DE FADE Y DESPLAZAMIENTO GSAP)
         ========================================================================= */}
      <section suppressHydrationWarning className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 text-black">
        <div className="w-full max-w-[1780px] mx-auto">
          
          {/* Encabezado con título editorial */}
          <div className="mb-8 border-b border-black/10 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-black">
                {t.discos.title}
              </h1>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mt-1.5">
                {selectedGenre === "TODOS"
                  ? t.discos.subtitle
                  : `Filtrando por: ${selectedGenre}`}
              </span>
            </div>

            {(q || selectedGenre !== "TODOS" || selectedSort !== "featured") && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-white font-mono text-[11px] uppercase tracking-wider hover:bg-neutral-800 transition-colors w-fit cursor-pointer self-start sm:self-end"
              >
                <X className="w-3 h-3" />
                <span>Restablecer Filtros</span>
              </button>
            )}
          </div>

          {/* Grilla o Lista animada con GSAP */}
          <div ref={catalogContentRef}>
            {processedDiscos.length === 0 ? (
              <div className="bg-white p-12 text-center rounded border border-black/10 my-8">
                <p className="font-serif text-lg text-neutral-800 mb-2">
                  No se encontraron vinilos para este criterio
                </p>
                <p className="text-xs font-mono text-neutral-500 mb-6">
                  Intenta cambiar el género o busca por otro término (artista, título, año).
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
