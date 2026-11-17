"use client";

import React, { useMemo } from "react";
import { EXTRAS_CATALOG, ExtraItem } from "@/data/extrasData";
import { useProductModalStore } from "@/store/productModalStore";
import { useLanguage } from "@/context/LanguageContext";
import { useSearchStore } from "@/store/searchStore";
import { X } from "lucide-react";

// Orden pre-mezclado (aleatorio) para Poleras (1 a 16)
const POLERAS_SHUFFLED_IDS = [5, 12, 2, 8, 14, 3, 11, 7, 1, 15, 4, 10, 16, 9, 6, 13];

// Orden curado para Cuadros (17 a 32) destacando los mejores al frente
const CUADROS_CURATED_IDS = [30, 31, 24, 20, 18, 32, 17, 25, 23, 21, 22, 19, 26, 28, 29, 27];

// Orden curado para Extras Plus (33 a 53) destacando piezas llamativas
const EXTRAS_PLUS_CURATED_IDS = [46, 47, 45, 38, 39, 49, 52, 50, 53, 33, 48, 51, 35, 41, 42, 44, 40, 36, 37, 34];

export const CosmosMasonryGrid: React.FC = () => {
  const { openModal } = useProductModalStore();
  const { t } = useLanguage();
  const { searchQuery, clearSearch } = useSearchStore();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const q = mounted ? searchQuery.trim().toLowerCase() : "";

  // Sección 1: Poleras (1 a 16)
  const polerasItems: ExtraItem[] = useMemo(() => {
    return POLERAS_SHUFFLED_IDS.map(
      (id) => EXTRAS_CATALOG.find((item) => item.id === id)!
    ).filter(Boolean);
  }, []);

  // Sección 2: Cuadros (17 a 32)
  const cuadrosItems: ExtraItem[] = useMemo(() => {
    return CUADROS_CURATED_IDS.map(
      (id) => EXTRAS_CATALOG.find((item) => item.id === id)!
    ).filter(Boolean);
  }, []);

  // Sección 3: Extras Plus (33 a 53)
  const extrasPlusItems: ExtraItem[] = useMemo(() => {
    return EXTRAS_PLUS_CURATED_IDS.map(
      (id) => EXTRAS_CATALOG.find((item) => item.id === id)!
    ).filter(Boolean);
  }, []);

  // Filtrado en vivo de todo el catálogo de extras
  const filteredAll = useMemo(() => {
    if (!q) return [];
    return EXTRAS_CATALOG.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [q]);

  const handleSelectProduct = (item: ExtraItem) => {
    openModal({
      id: `extra-${item.id}`,
      title: item.title,
      subtitle: item.categoryLabel,
      categoryLabel: item.categoryLabel,
      priceBs: item.priceBs,
      image: item.image,
      description: item.description,
      type: "sleeve",
    });
  };

  return (
    <section suppressHydrationWarning className="w-full min-h-screen bg-[#EDEDED] text-black py-8 sm:py-20 px-4 sm:px-10 lg:px-16">
      <div className="w-full max-w-[1720px] mx-auto">
        
        {/* Encabezado principal */}
        <div className="mb-8 sm:mb-12 border-b border-black/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-black">
              {t.extras.title}
            </h1>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mt-2">
              {t.extras.subtitle}
            </span>
          </div>

          {mounted && q && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-neutral-600">
                {filteredAll.length} {t.extras.itemsFound}
              </span>
              <button
                type="button"
                onClick={clearSearch}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-white rounded font-mono text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>{t.extras.clearFilter}</span>
              </button>
            </div>
          )}
        </div>

        {q ? (
          <div>
            {filteredAll.length === 0 ? (
              <div className="bg-white p-12 text-center rounded border border-black/10 my-8">
                <p className="font-serif text-lg text-neutral-800 mb-2">
                  {t.extras.noResults}
                </p>
                <p className="text-xs font-mono text-neutral-500 mb-6">
                  &ldquo;{searchQuery}&rdquo;
                </p>
                <button
                  type="button"
                  onClick={clearSearch}
                  className="px-4 py-2 bg-black text-white rounded font-mono text-xs uppercase cursor-pointer"
                >
                  {t.extras.clearFilter}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3.5 sm:gap-x-8 gap-y-6 sm:gap-y-12">
                {filteredAll.map((item) => (
                  <ProductCard key={item.id} item={item} onSelect={() => handleSelectProduct(item)} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* SECCIÓN 1: POLERAS */}
            <div>
              <div className="mb-6 sm:mb-8">
                <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#111111] border-b border-[#111111] pb-1 inline-block">
                  {t.extras.polerasTitle}
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3.5 sm:gap-x-8 gap-y-6 sm:gap-y-12">
                {polerasItems.map((item) => (
                  <ProductCard key={item.id} item={item} onSelect={() => handleSelectProduct(item)} />
                ))}
              </div>
            </div>

            <div className="w-full border-b border-gray-300 my-10 sm:my-16" />

            {/* SECCIÓN 2: CUADROS */}
            <div>
              <div className="mb-6 sm:mb-8">
                <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#111111] border-b border-[#111111] pb-1 inline-block">
                  {t.extras.cuadrosTitle}
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3.5 sm:gap-x-8 gap-y-6 sm:gap-y-12">
                {cuadrosItems.map((item) => (
                  <ProductCard key={item.id} item={item} onSelect={() => handleSelectProduct(item)} />
                ))}
              </div>
            </div>

            <div className="w-full border-b border-gray-300 my-10 sm:my-16" />

            {/* SECCIÓN 3: EXTRAS PLUS */}
            <div>
              <div className="mb-6 sm:mb-8">
                <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#111111] border-b border-[#111111] pb-1 inline-block">
                  {t.extras.extrasPlusTitle}
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3.5 sm:gap-x-8 gap-y-6 sm:gap-y-12">
                {extrasPlusItems.map((item) => (
                  <ProductCard key={item.id} item={item} onSelect={() => handleSelectProduct(item)} />
                ))}
              </div>
            </div>
          </>
        )}

      </div>
    </section>
  );
};

interface ProductCardProps {
  item: ExtraItem;
  onSelect: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="flex flex-col select-none group cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="relative w-full aspect-[4/3] bg-white rounded-sm overflow-hidden border border-black/5 shadow-sm">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="pt-2 sm:pt-3.5 flex flex-col">
        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-500 truncate">
          {item.categoryLabel}
        </span>
        <h3 className="font-serif text-[14px] sm:text-[17px] font-normal text-black mt-0.5 sm:mt-1 leading-snug group-hover:opacity-75 transition-opacity line-clamp-1">
          {item.title}
        </h3>
        <p className="font-sans text-[11px] sm:text-xs text-neutral-600 mt-0.5 sm:mt-1 line-clamp-2 leading-relaxed font-light">
          {item.description}
        </p>
        <p className="text-xs sm:text-sm font-bold font-mono text-black mt-1 sm:mt-2">
          Bs. {item.priceBs.toLocaleString()}
        </p>
      </div>
    </div>
  );
};
