"use client";

import React, { useState } from "react";
import { EXTRAS_CATALOG, ExtraItem } from "@/data/extrasData";
import { X, MessageCircle } from "lucide-react";

// Orden pre-mezclado (aleatorio) para Poleras (1 a 16)
const POLERAS_SHUFFLED_IDS = [5, 12, 2, 8, 14, 3, 11, 7, 1, 15, 4, 10, 16, 9, 6, 13];

// Orden curado para Cuadros (17 a 32) destacando los mejores al frente
const CUADROS_CURATED_IDS = [30, 31, 24, 20, 18, 32, 17, 25, 23, 21, 22, 19, 26, 28, 29, 27];

// Orden curado para Extras Plus (33 a 53) destacando piezas llamativas
const EXTRAS_PLUS_CURATED_IDS = [46, 47, 45, 38, 39, 49, 52, 50, 53, 33, 48, 51, 35, 41, 42, 44, 40, 36, 37, 34];

export const CosmosMasonryGrid: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ExtraItem | null>(null);

  // Sección 1: Poleras (1 a 16) en orden aleatorio
  const polerasItems: ExtraItem[] = POLERAS_SHUFFLED_IDS.map(
    (id) => EXTRAS_CATALOG.find((item) => item.id === id)!
  ).filter(Boolean);

  // Sección 2: Cuadros (17 a 32) con los mejores al frente
  const cuadrosItems: ExtraItem[] = CUADROS_CURATED_IDS.map(
    (id) => EXTRAS_CATALOG.find((item) => item.id === id)!
  ).filter(Boolean);

  // Sección 3: Extras Plus (33 a 53)
  const extrasPlusItems: ExtraItem[] = EXTRAS_PLUS_CURATED_IDS.map(
    (id) => EXTRAS_CATALOG.find((item) => item.id === id)!
  ).filter(Boolean);

  return (
    <section className="w-full min-h-screen bg-[#EDEDED] text-black py-12 sm:py-20 px-6 sm:px-10 lg:px-16">
      <div className="w-full max-w-[1720px] mx-auto">
        
        {/* Encabezado principal */}
        <div className="mb-12 border-b border-black/10 pb-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-black">
            Extras
          </h1>
        </div>

        {/* =====================================================================
            SECCIÓN 1: POLERAS (1 a 16, orden aleatorio)
           ===================================================================== */}
        <div>
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#111111] border-b border-[#111111] pb-1 inline-block">
              Poleras
            </h2>
          </div>

          {/* Grilla 4 columnas idéntica a Tocadiscos: todos del mismo tamaño */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {polerasItems.map((item) => (
              <ProductCard key={item.id} item={item} onSelect={() => setSelectedItem(item)} />
            ))}
          </div>
        </div>

        {/* Separador de sección estilo Discos */}
        <div className="w-full border-b border-gray-300 my-12 sm:my-16" />

        {/* =====================================================================
            SECCIÓN 2: CUADROS (17 a 32, con los mejores al frente)
           ===================================================================== */}
        <div>
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#111111] border-b border-[#111111] pb-1 inline-block">
              Cuadros
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {cuadrosItems.map((item) => (
              <ProductCard key={item.id} item={item} onSelect={() => setSelectedItem(item)} />
            ))}
          </div>
        </div>

        {/* Separador de sección estilo Discos */}
        <div className="w-full border-b border-gray-300 my-12 sm:my-16" />

        {/* =====================================================================
            SECCIÓN 3: EXTRAS PLUS (33 a 53)
           ===================================================================== */}
        <div>
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#111111] border-b border-[#111111] pb-1 inline-block">
              Extras Plus
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {extrasPlusItems.map((item) => (
              <ProductCard key={item.id} item={item} onSelect={() => setSelectedItem(item)} />
            ))}
          </div>
        </div>

      </div>

      {/* =====================================================================
          MODAL DETALLE AL HACER CLIC
         ===================================================================== */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative bg-white text-neutral-900 rounded-lg max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              aria-label="Cerrar vista previa"
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Imagen del modal */}
            <div className="w-full md:w-3/5 bg-neutral-950 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="max-h-[55vh] md:max-h-[80vh] w-auto max-w-full object-contain rounded"
              />
            </div>

            {/* Información */}
            <div className="w-full md:w-2/5 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 bg-neutral-100 px-2.5 py-0.5 rounded inline-block mb-2">
                  {selectedItem.categoryLabel}
                </span>

                <h2 className="text-xl sm:text-2xl font-light tracking-tight text-neutral-900 mb-2">
                  {selectedItem.title}
                </h2>

                <div className="text-2xl sm:text-3xl font-light text-neutral-900 font-mono mb-4">
                  Bs. {selectedItem.priceBs.toLocaleString()}
                </div>

                <div className="text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3 mb-6">
                  {selectedItem.description}
                </div>

                <div className="space-y-2 text-xs font-mono text-neutral-500 bg-neutral-50 p-3 rounded border border-neutral-200/60 mb-6">
                  <div className="flex justify-between">
                    <span>Disponibilidad:</span>
                    <span className="text-emerald-600 font-medium">En stock / Curaduría</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío:</span>
                    <span>Toda Bolivia</span>
                  </div>
                </div>
              </div>

              {/* Botón WhatsApp */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `¡Hola! Estoy interesado en el artículo de Aguja & Vinilo: "${selectedItem.title}" por Bs. ${selectedItem.priceBs}. ¿Tienen disponibilidad?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-black hover:bg-neutral-800 text-white rounded font-mono text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// =========================================================================
// TARJETA IDÉNTICA A TOCADISCOS: MISMO TAMAÑO PARA TODAS (ASPECT 4/3)
// =========================================================================
interface ProductCardProps {
  item: ExtraItem;
  onSelect: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="flex flex-col select-none group cursor-pointer"
    >
      {/* Contenedor de imagen de tamaño fijo 4:3 con efecto de desvanecido oscuro en hover */}
      <div className="relative w-full aspect-[4/3] bg-white rounded-sm overflow-hidden border border-black/5 shadow-sm">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Efecto desvanecido oscuro que le gustó al usuario (no recorta ni altera el tamaño del card) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white pointer-events-none">
          <p className="text-xs text-neutral-200 line-clamp-2 leading-relaxed drop-shadow-sm font-light">
            {item.description}
          </p>
        </div>
      </div>

      {/* Info permanente abajo con tipografía idéntica a Tocadiscos */}
      <div className="pt-3.5 flex flex-col">
        <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500">
          {item.categoryLabel}
        </span>
        <h3 className="font-bold text-base text-black mt-0.5 leading-snug line-clamp-1">
          {item.title}
        </h3>
        <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
        <p className="text-sm font-bold font-mono text-black mt-2">
          Bs. {item.priceBs.toLocaleString()}
        </p>
      </div>
    </div>
  );
};
