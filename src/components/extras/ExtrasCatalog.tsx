"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { EXTRAS_CATALOG, ExtraItem } from "@/data/extrasData";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { useProductModalStore } from "@/store/productModalStore";
import { HoverRollText } from "@/components/ui/HoverRollText";
import { TiltCard } from "@/components/ui/TiltCard";
import { Check, Plus, Search, Sparkles } from "lucide-react";
import gsap from "gsap";

type CategoryFilter = "todos" | "cuidado" | "fundas" | "accesorios";

interface TabDef {
  key: CategoryFilter;
  label: string;
}

const TABS: TabDef[] = [
  { key: "todos", label: "Todos" },
  { key: "cuidado", label: "Cuidado y Limpieza" },
  { key: "fundas", label: "Fundas" },
  { key: "accesorios", label: "Accesorios" },
];

export const ExtrasCatalog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedItems, setAddedItems] = useState<Record<number, boolean>>({});

  const { addItem } = useCartStore();
  const { showToast } = useToastStore();
  const { openModal } = useProductModalStore();

  // Refs para la línea deslizante interactiva
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabButtonRefs = useRef<Map<CategoryFilter, HTMLButtonElement>>(new Map());
  const indicatorRef = useRef<HTMLDivElement>(null);

  // Animación suave de la línea de 1px hacia la pestaña activa con GSAP
  useEffect(() => {
    const activeBtn = tabButtonRefs.current.get(activeCategory);
    const container = tabsContainerRef.current;
    const indicator = indicatorRef.current;

    if (!activeBtn || !container || !indicator) return;

    const btnRect = activeBtn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const targetLeft = btnRect.left - containerRect.left;
    const targetWidth = btnRect.width;

    gsap.to(indicator, {
      x: targetLeft,
      width: targetWidth,
      duration: 0.35,
      ease: "power3.out",
    });
  }, [activeCategory]);

  // Filtrado de productos
  const filteredItems = useMemo(() => {
    let list = EXTRAS_CATALOG;
    if (activeCategory !== "todos") {
      list = list.filter((item) => item.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  const handleAddToCart = (e: React.MouseEvent, item: ExtraItem) => {
    e.stopPropagation();
    addItem(
      {
        id: `extra-${item.id}`,
        type: "sleeve",
        title: item.title,
        subtitle: item.categoryLabel,
        priceBs: item.priceBs,
        imageOrCover: item.image,
      },
      1
    );

    showToast(item.title);

    // Feedback inmediato "Agregado ✓"
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 1600);
  };

  const handleOpenModal = (item: ExtraItem) => {
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
    <section className="w-full min-h-screen bg-[#EDEDED] text-black pt-28 pb-24 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Cabecera Editorial Limpia */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-black inline-block" />
              <span className="font-mono text-[11px] tracking-widest uppercase text-neutral-600">
                Objetos Esenciales & Mantenimiento
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900">
              Extras & Cuidado
            </h1>
            <p className="mt-3 font-sans text-sm sm:text-base text-neutral-600 max-w-xl font-light">
              Herramientas de preservación analógica, fundas antiestáticas de archivo, estabilizadores y accesorios para tu colección.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Buscador minimalista de línea inferior */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Buscar accesorios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-black/30 pb-1.5 pl-7 pr-2 font-mono text-xs text-black placeholder:text-neutral-500 focus:outline-none focus:border-black transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-0 top-1/2 -translate-y-1/2" />
            </div>

            {/* Contador Dinámico */}
            <div className="font-mono text-xs text-neutral-500 border border-black/10 px-3 py-1.5 bg-white/60">
              {filteredItems.length} {filteredItems.length === 1 ? "objeto" : "objetos"}
            </div>
          </div>
        </div>

        {/* 1. Pestañas Minimalistas con Línea Deslizante de 1px */}
        <div className="relative mt-8 mb-10 border-b border-black/15">
          <div
            ref={tabsContainerRef}
            className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-3 relative"
          >
            {TABS.map((tab) => {
              const isActive = activeCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  ref={(el) => {
                    if (el) tabButtonRefs.current.set(tab.key, el);
                    else tabButtonRefs.current.delete(tab.key);
                  }}
                  onClick={() => setActiveCategory(tab.key)}
                  className={`font-mono text-xs tracking-wider uppercase whitespace-nowrap transition-colors py-1 cursor-pointer select-none ${
                    isActive
                      ? "text-black font-bold"
                      : "text-neutral-500 hover:text-black"
                  }`}
                >
                  <HoverRollText text={tab.label} />
                </button>
              );
            })}

            {/* Línea inferior de 1px que se desliza suavemente */}
            <div
              ref={indicatorRef}
              className="absolute bottom-0 left-0 h-[1.5px] bg-black pointer-events-none"
              style={{ width: 0 }}
            />
          </div>
        </div>

        {/* 2. Grilla de Objetos (3 o 4 columnas en Desktop) */}
        {filteredItems.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-black/20">
            <p className="font-serif text-lg text-neutral-700">No se encontraron objetos en esta categoría.</p>
            <button
              onClick={() => {
                setActiveCategory("todos");
                setSearchQuery("");
              }}
              className="mt-4 font-mono text-xs uppercase tracking-wider text-black border-b border-black pb-0.5"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const isAdded = addedItems[item.id];

              return (
                <div
                  key={item.id}
                  onClick={() => handleOpenModal(item)}
                  className="group flex flex-col bg-[#F9F9F8] border border-black/10 hover:border-black/30 transition-all duration-200 cursor-pointer select-none"
                >
                  {/* Foto Relación 4:5 Limpia */}
                  <div className="relative w-full aspect-[4/5] bg-[#E8E8E6] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
                    />

                    {/* Badge sutil si existe */}
                    {item.badge && (
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs border border-black/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-black font-semibold">
                        {item.badge}
                      </div>
                    )}

                    {/* Botón "+ Agregar" que aparece instantáneamente al hacer Hover con feedback "Agregado ✓" */}
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(e, item)}
                        className={`w-full py-2.5 px-4 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                          isAdded
                            ? "bg-neutral-900 text-white font-bold"
                            : "bg-white text-black hover:bg-black hover:text-white border border-black/20"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[2.5] text-green-400" />
                            <span>Agregado ✓</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 stroke-[2]" />
                            <HoverRollText text="Agregar al carrito" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Ficha técnica y precio */}
                  <div className="p-4 flex flex-col justify-between flex-1 bg-[#F9F9F8]">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-1">
                        {item.categoryLabel}
                      </div>
                      <h3 className="font-serif text-base text-neutral-900 line-clamp-2 group-hover:text-black leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-neutral-900">
                        Bs. {item.priceBs}
                      </span>
                      <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                        En stock
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
