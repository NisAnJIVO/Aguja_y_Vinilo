"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { MOCK_RECORDS } from "@/data/mock-records";
import { Genre, Mood, VinylFormat, VinylRecord } from "@/data/types";
import { VinylDiscCover } from "@/components/ui/VinylDiscCover";
import { useCartStore } from "@/store/cartStore";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Disc,
  ShoppingBag,
  RotateCcw,
  Check
} from "lucide-react";

const GENRES: (Genre | "Todos")[] = [
  "Todos",
  "Rock Progresivo & Psicodelia",
  "Jazz & Bop",
  "Folk & Andino Psicodélico",
  "Funk & Soul",
  "Electrónica & Ambient",
  "Bossa Nova & MPB",
  "Post-Punk & Wave"
];

const DECADES = ["Todas", "60s", "70s", "80s", "90s", "2000s", "Actual"];

const MOODS: (Mood | "Todos")[] = [
  "Todos",
  "Madrugada Solitaria",
  "Concentración Profunda",
  "Celebración Cálida",
  "Nostalgia Dorada",
  "Viaje Psiconáutico",
  "Domingo Lento"
];

const FORMATS: (VinylFormat | "Todos")[] = [
  "Todos",
  "12\" LP 180g",
  "Doble LP Gatefold",
  "7\" Single",
  "Edición Especial Audiófila"
];

export default function CatalogoPage() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | "Todos">("Todos");
  const [selectedDecade, setSelectedDecade] = useState<string>("Todas");
  const [selectedMood, setSelectedMood] = useState<Mood | "Todos">("Todos");
  const [selectedFormat, setSelectedFormat] = useState<VinylFormat | "Todos">("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"destacados" | "precio-asc" | "precio-desc" | "año-desc" | "titulo">("destacados");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [addedRecordId, setAddedRecordId] = useState<string | null>(null);

  const { addItem } = useCartStore();

  const filteredRecords = useMemo(() => {
    let list = [...MOCK_RECORDS];

    if (selectedGenre !== "Todos") {
      list = list.filter((r) => r.genre === selectedGenre);
    }
    if (selectedDecade !== "Todas") {
      list = list.filter((r) => r.decade === selectedDecade);
    }
    if (selectedMood !== "Todos") {
      list = list.filter((r) => r.mood === selectedMood);
    }
    if (selectedFormat !== "Todos") {
      list = list.filter((r) => r.format === selectedFormat);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.artist.toLowerCase().includes(q) ||
          r.genre.toLowerCase().includes(q) ||
          r.label.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "precio-asc":
        list.sort((a, b) => a.priceBs - b.priceBs);
        break;
      case "precio-desc":
        list.sort((a, b) => b.priceBs - a.priceBs);
        break;
      case "año-desc":
        list.sort((a, b) => b.year - a.year);
        break;
      case "titulo":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return list;
  }, [selectedGenre, selectedDecade, selectedMood, selectedFormat, searchQuery, sortBy]);

  const handleAddToCart = (record: VinylRecord, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: record.id,
      type: "vinyl",
      title: record.title,
      subtitle: `${record.artist} — ${record.format}`,
      priceBs: record.priceBs,
      imageOrCover: record.coverPalette
    });
    setAddedRecordId(record.id);
    setTimeout(() => setAddedRecordId(null), 1800);
  };

  const resetFilters = () => {
    setSelectedGenre("Todos");
    setSelectedDecade("Todas");
    setSelectedMood("Todos");
    setSelectedFormat("Todos");
    setSearchQuery("");
    setSortBy("destacados");
  };

  const activeFiltersCount =
    (selectedGenre !== "Todos" ? 1 : 0) +
    (selectedDecade !== "Todas" ? 1 : 0) +
    (selectedMood !== "Todos" ? 1 : 0) +
    (selectedFormat !== "Todos" ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* HEADER SECTION */}
      <div className="space-y-4 border-b border-black/10 dark:border-white/10 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] uppercase tracking-widest">
          <Disc className="w-3.5 h-3.5" />
          <span>Fondo de Catálogo • 180g Prensado Virgen</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl text-theme-primary">
              Batea de Vinilos
            </h1>
            <p className="text-sm text-theme-muted max-w-xl mt-2 font-light">
              Explora nuestra colección física ordenada por estados de ánimo, épocas y géneros.
              Discos libres de saltos, revisados y empacados en fundas archivísticas antiestáticas.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="font-mono text-xs text-theme-muted bg-theme-card px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 flex items-center gap-3 shadow-sm">
            <span>Mostrando: <strong className="text-theme-primary">{filteredRecords.length}</strong> de {MOCK_RECORDS.length} discos</span>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-[#C05436] hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Limpiar ({activeFiltersCount})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SEARCH AND CONTROLS BAR */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por artista, álbum o sello..."
            className="w-full bg-theme-card border border-black/10 dark:border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-xs text-theme-primary placeholder-theme-muted focus:border-[#C89D56] focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-theme-muted hover:text-theme-primary"
            >
              ✕
            </button>
          )}
        </div>

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-3 justify-between md:justify-end">
          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="md:hidden flex items-center gap-2 px-3 py-2 rounded-lg bg-theme-card border border-black/10 dark:border-white/10 text-xs text-theme-primary"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filtros ({activeFiltersCount})</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-theme-muted">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-theme-card border border-black/10 dark:border-white/10 rounded-lg px-3 py-2 text-xs text-theme-primary focus:border-[#C89D56] focus:outline-none"
            >
              <option value="destacados">Selección del Curador</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
              <option value="año-desc">Año: Más Recientes</option>
              <option value="titulo">Título: A — Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* GENRES TABS STRIP */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-black/5 dark:border-white/5">
        {GENRES.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedGenre === genre
                ? "bg-[#C89D56] text-[#0E0E0C] font-semibold shadow-md"
                : "text-theme-muted hover:text-theme-primary hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* MAIN LAYOUT: FILTERS SIDEBAR + ALBUMS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SIDEBAR FILTERS (DESKTOP OR MOBILE TOGGLE) */}
        <aside
          className={`lg:col-span-3 space-y-6 ${
            showFiltersMobile ? "block" : "hidden lg:block"
          } bg-theme-card p-6 rounded-xl border border-black/10 dark:border-white/10 shadow-sm`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
            <h3 className="font-display font-medium text-sm text-theme-primary">Criterios de Escucha</h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-mono text-[#C05436] hover:underline"
              >
                Reiniciar
              </button>
            )}
          </div>

          {/* Filter: Estado de ánimo */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] block font-semibold">
              Estado de Ánimo
            </label>
            <div className="flex flex-col gap-1 text-xs">
              {MOODS.map((mood) => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className={`text-left px-2.5 py-1.5 rounded transition-colors flex items-center justify-between ${
                    selectedMood === mood
                      ? "bg-[#C89D56]/15 text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] font-semibold"
                      : "text-theme-muted hover:text-theme-primary hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <span>{mood}</span>
                  {selectedMood === mood && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </div>

          {/* Filter: Época / Década */}
          <div className="space-y-2 pt-4 border-t border-black/5 dark:border-white/5">
            <label className="text-xs font-mono uppercase tracking-wider text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] block font-semibold">
              Época / Década
            </label>
            <div className="grid grid-cols-2 gap-1 text-xs">
              {DECADES.map((dec) => (
                <button
                  key={dec}
                  onClick={() => setSelectedDecade(dec)}
                  className={`px-2.5 py-1.5 rounded transition-colors text-center ${
                    selectedDecade === dec
                      ? "bg-[#C89D56] text-[#0E0E0C] font-semibold shadow-sm"
                      : "bg-black/5 dark:bg-white/5 text-theme-muted hover:text-theme-primary"
                  }`}
                >
                  {dec}
                </button>
              ))}
            </div>
          </div>

          {/* Filter: Formato */}
          <div className="space-y-2 pt-4 border-t border-black/5 dark:border-white/5">
            <label className="text-xs font-mono uppercase tracking-wider text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] block font-semibold">
              Formato de Prensado
            </label>
            <div className="flex flex-col gap-1 text-xs">
              {FORMATS.map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`text-left px-2.5 py-1.5 rounded transition-colors flex items-center justify-between ${
                    selectedFormat === fmt
                      ? "bg-[#C89D56]/15 text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] font-semibold"
                      : "text-theme-muted hover:text-theme-primary hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <span>{fmt}</span>
                  {selectedFormat === fmt && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ALBUMS GRID */}
        <main className="lg:col-span-9">
          {filteredRecords.length === 0 ? (
            <div className="text-center py-20 bg-theme-card rounded-2xl border border-black/10 dark:border-white/10 p-8 space-y-4">
              <Disc className="w-12 h-12 text-theme-muted mx-auto animate-spin-slow" />
              <h3 className="font-display text-xl text-theme-primary">No hay discos con estos filtros</h3>
              <p className="text-xs text-theme-muted max-w-sm mx-auto">
                Prueba ajustando los criterios o limpiando la búsqueda para hojear otros títulos del catálogo.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded bg-[#C89D56] text-[#0E0E0C] text-xs font-semibold hover:bg-[#DDB36D] transition-colors"
              >
                Restablecer Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredRecords.map((record) => (
                <div
                  key={record.id}
                  className="group flex flex-col justify-between p-4 rounded-xl bg-theme-card border border-black/10 dark:border-white/10 hover:border-[#C89D56]/50 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
                >
                  {/* Vinyl Cover with slide-out effect */}
                  <Link
                    href={`/catalogo/${record.slug}`}
                    className="flex justify-center pt-2 pb-4 overflow-hidden"
                  >
                    <VinylDiscCover record={record} size="md" showSlideOutOnHover />
                  </Link>

                  {/* Album Info */}
                  <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] truncate max-w-[150px] font-medium">{record.genre}</span>
                      <span className="text-theme-muted">{record.year}</span>
                    </div>

                    <Link
                      href={`/catalogo/${record.slug}`}
                      className="block font-display font-semibold text-base text-theme-primary hover:text-[#C89D56] transition-colors line-clamp-1"
                    >
                      {record.title}
                    </Link>

                    <p className="text-xs text-theme-secondary line-clamp-1">{record.artist}</p>

                    <p className="text-[11px] text-theme-muted line-clamp-2 leading-relaxed">
                      {record.description}
                    </p>

                    {/* Bottom actions */}
                    <div className="pt-2 flex items-center justify-between border-t border-black/5 dark:border-white/5">
                      <div className="flex flex-col">
                        <span className="font-mono font-bold text-sm text-theme-primary">
                          {record.priceBs} Bs
                        </span>
                        <span className="text-[9px] font-mono text-theme-muted uppercase">
                          {record.weight} • {record.speed}
                        </span>
                      </div>

                      <button
                        onClick={(e) => handleAddToCart(record, e)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 shadow-sm ${
                          addedRecordId === record.id
                            ? "bg-[#5F6B50] text-white"
                            : "bg-[#C89D56] hover:bg-[#DDB36D] text-[#0E0E0C]"
                        }`}
                      >
                        {addedRecordId === record.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Agregado</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Bolsa</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
