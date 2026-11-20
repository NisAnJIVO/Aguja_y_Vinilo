"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { DiscoItem } from "@/data/discosData";
import { useProductModalStore } from "@/store/productModalStore";
import { useLanguage } from "@/context/LanguageContext";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { Plus } from "lucide-react";

interface DiscosListViewProps {
  items: DiscoItem[];
}

export const DiscosListView: React.FC<DiscosListViewProps> = ({ items }) => {
  const { openModal } = useProductModalStore();
  const { language } = useLanguage();
  const { addItem } = useCartStore();
  const { showToast } = useToastStore();
  const isEn = language === "en";

  const [hoveredItem, setHoveredItem] = useState<DiscoItem | null>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (floatingRef.current) {
      gsap.set(floatingRef.current, { xPercent: 15, yPercent: -50 });
      xTo.current = gsap.quickTo(floatingRef.current, "x", {
        duration: 0.25,
        ease: "power2.out",
      });
      yTo.current = gsap.quickTo(floatingRef.current, "y", {
        duration: 0.25,
        ease: "power2.out",
      });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (xTo.current && yTo.current) {
      xTo.current(e.clientX);
      yTo.current(e.clientY);
    }
  };

  const handleOpenModal = (item: DiscoItem) => {
    openModal({
      id: item.id,
      title: item.title,
      subtitle: item.artist,
      categoryLabel: isEn ? `Vinyl • ${item.year}` : `Vinilo • ${item.year}`,
      format: item.format,
      priceBs: item.priceBs,
      image: item.coverImage,
      description: isEn
        ? `Special edition album "${item.title}" by ${item.artist}. Track: "${item.song}". Format: ${item.format} (${item.year}).`
        : `Álbum de ${item.artist} en edición especial "${item.title}". Incluye "${item.song}". Formato: ${item.format} (${item.year}).`,
      type: "vinyl",
    });
  };

  const handleAddToCart = (e: React.MouseEvent, item: DiscoItem) => {
    e.stopPropagation();
    addItem(
      {
        id: item.id,
        type: "vinyl",
        title: item.title,
        subtitle: item.artist,
        priceBs: item.priceBs,
        imageOrCover: item.coverImage,
      },
      1
    );
    showToast(item.title);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredItem(null)}
      className="w-full relative"
    >
      {/* IMAGEN FLOTANTE CON INERCIA GSAP (SOLO ESCRITORIO) */}
      <div
        ref={floatingRef}
        aria-hidden="true"
        className={`fixed pointer-events-none z-50 w-52 h-52 lg:w-60 lg:h-60 border border-black bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden transition-opacity duration-150 hidden md:block select-none ${
          hoveredItem ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ top: 0, left: 0 }}
      >
        {hoveredItem && (
          <div className="relative w-full h-full">
            <Image
              src={hoveredItem.coverImage}
              alt={hoveredItem.title}
              fill
              unoptimized
              sizes="240px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-black/85 p-2 text-white font-mono text-[11px] flex justify-between items-center">
              <span className="truncate max-w-[140px]">{hoveredItem.title}</span>
              <span className="font-bold">Bs. {hoveredItem.priceBs}</span>
            </div>
          </div>
        )}
      </div>

      {/* CABECERA DE LA TABLA (DESKTOP) */}
      <div className="hidden md:grid grid-cols-12 items-center gap-4 py-3 px-4 text-[11px] font-mono uppercase tracking-wider text-neutral-500 border-b border-black/20 select-none">
        <span className="col-span-3">Artista</span>
        <span className="col-span-4">Álbum</span>
        <span className="col-span-2">Formato / Año</span>
        <span className="col-span-2 text-right">Precio</span>
        <span className="col-span-1 text-center">Añadir</span>
      </div>

      {/* LISTA DE FILAS CON LÍNEAS DE 1PX Y CONTRASTE INVERTIDO AL HOVER */}
      <div className="divide-y divide-black/10 border-t md:border-t-0 border-b border-black/10">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpenModal(item)}
            onMouseEnter={() => setHoveredItem(item)}
            data-cursor="VER"
            className="discos-list-row group w-full py-3.5 px-3 sm:px-4 cursor-pointer transition-colors duration-150 select-none hover:bg-black hover:text-white"
          >
            {/* VISTA MÓVIL (CON MINIATURA FIJA A LA IZQUIERDA) */}
            <div className="md:hidden flex items-center justify-between gap-3 w-full">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-12 h-12 shrink-0 overflow-hidden border border-black/10 bg-neutral-200">
                  <Image
                    src={item.coverImage}
                    alt={`${item.artist} - ${item.title}`}
                    fill
                    unoptimized
                    sizes="48px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <h4 className="font-serif text-sm font-normal text-neutral-900 group-hover:text-white truncate">
                    {item.artist}
                  </h4>
                  <p className="font-sans text-xs text-neutral-600 group-hover:text-neutral-300 font-light truncate">
                    {item.title}
                  </p>
                  <p className="font-mono text-[10px] text-neutral-400 group-hover:text-neutral-300 truncate">
                    Bs. {item.priceBs}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => handleAddToCart(e, item)}
                className="p-2 border border-black/20 group-hover:border-white/40 text-black group-hover:text-white shrink-0"
                aria-label="Agregar al carrito"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* VISTA ESCRITORIO (GRILLA DE 12 COLS CON CONTRASTE INVERTIDO) */}
            <div className="hidden md:grid grid-cols-12 items-center gap-4 w-full">
              {/* Artista */}
              <span className="col-span-3 font-serif text-sm font-normal tracking-tight text-neutral-900 group-hover:text-white truncate">
                {item.artist}
              </span>

              {/* Álbum */}
              <span className="col-span-4 font-sans text-sm font-light text-neutral-700 group-hover:text-neutral-200 truncate">
                {item.title}
              </span>

              {/* Género / Año */}
              <span className="col-span-2 font-mono text-xs text-neutral-500 group-hover:text-neutral-300 truncate">
                {item.year} • {item.format.replace("Vinilo — ", "")}
              </span>

              {/* Precio */}
              <span className="col-span-2 font-mono text-sm font-bold text-neutral-900 group-hover:text-white text-right">
                Bs. {item.priceBs}
              </span>

              {/* Botón "+" */}
              <div className="col-span-1 flex justify-center">
                <button
                  type="button"
                  onClick={(e) => handleAddToCart(e, item)}
                  data-cursor="+ CARRITO"
                  className="p-1.5 border border-black/20 group-hover:border-white text-black group-hover:text-white transition-colors cursor-pointer hover:bg-white hover:text-black"
                  title="Agregar al carrito"
                  aria-label="Agregar al carrito"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
