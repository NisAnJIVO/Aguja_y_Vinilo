"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { DiscoItem } from "@/data/discosData";
import { useProductModalStore } from "@/store/productModalStore";
import { useLanguage } from "@/context/LanguageContext";

interface DiscosListViewProps {
  items: DiscoItem[];
}

export const DiscosListView: React.FC<DiscosListViewProps> = ({ items }) => {
  const { openModal } = useProductModalStore();
  const { language } = useLanguage();
  const isEn = language === "en";

  const [hoveredItem, setHoveredItem] = useState<DiscoItem | null>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (floatingRef.current) {
      gsap.set(floatingRef.current, { xPercent: 15, yPercent: -50 });
      xTo.current = gsap.quickTo(floatingRef.current, "x", {
        duration: 0.35,
        ease: "power3.out",
      });
      yTo.current = gsap.quickTo(floatingRef.current, "y", {
        duration: 0.35,
        ease: "power3.out",
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
        ? `Special edition album "${item.title}" by ${item.artist}. Features the hit track "${item.song}". Format: ${item.format} (${item.year}). High fidelity pressing for collectors.`
        : `Álbum de ${item.artist} en edición especial "${item.title}". Incluye la canción destacada "${item.song}". Formato: ${item.format} (${item.year}). Edición prensada para coleccionistas con audio de alta fidelidad.`,
      type: "vinyl",
    });
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
        className={`fixed pointer-events-none z-50 w-56 h-56 lg:w-64 lg:h-64 border-2 border-black bg-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] overflow-hidden transition-opacity duration-200 hidden md:block select-none ${
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
              sizes="260px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs p-2.5 text-white font-mono text-[11px] flex justify-between items-center border-t border-white/20">
              <span className="truncate max-w-[150px] font-medium">{hoveredItem.title}</span>
              <span className="font-bold">Bs. {hoveredItem.priceBs}</span>
            </div>
          </div>
        )}
      </div>

      {/* CABECERA DE LA TABLA (DESKTOP) */}
      <div className="hidden md:grid grid-cols-12 items-center gap-4 py-3 px-4 text-[11px] font-mono uppercase tracking-wider text-neutral-500 border-b border-black select-none">
        <span className="col-span-1">#</span>
        <span className="col-span-4">Artista</span>
        <span className="col-span-4">Álbum</span>
        <span className="col-span-2">Año / Formato</span>
        <span className="col-span-1 text-right">Precio</span>
      </div>

      {/* LISTA DE FILAS CON CONTRASTE INVERTIDO AL HOVER */}
      <div className="divide-y divide-black/15 border-t md:border-t-0 border-b border-black/15">
        {items.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => handleOpenModal(item)}
            onMouseEnter={() => setHoveredItem(item)}
            data-cursor="VER"
            className="group w-full py-3.5 px-3 sm:px-4 cursor-pointer transition-colors duration-150 select-none hover:bg-black hover:text-white"
          >
            {/* VISTA MÓVIL (CON MINIATURA FIJA A LA IZQUIERDA) */}
            <div className="md:hidden flex items-center gap-3 w-full">
              <div className="relative w-14 h-14 shrink-0 rounded-xs overflow-hidden border border-black/10 bg-neutral-200">
                <Image
                  src={item.coverImage}
                  alt={`${item.artist} - ${item.title}`}
                  fill
                  unoptimized
                  sizes="60px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-neutral-400 group-hover:text-neutral-400">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-serif text-sm font-normal text-neutral-900 group-hover:text-white truncate">
                    {item.artist}
                  </h4>
                </div>
                <p className="font-sans text-xs text-neutral-600 group-hover:text-neutral-300 font-light truncate mt-0.5">
                  {item.title}
                </p>
                <p className="font-mono text-[10px] text-neutral-400 group-hover:text-neutral-400 truncate mt-0.5">
                  {item.year} • {item.format}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="font-mono text-xs font-bold text-neutral-900 group-hover:text-white block">
                  Bs. {item.priceBs}
                </span>
                <span className="text-[10px] font-mono text-neutral-400 group-hover:text-neutral-300 uppercase">
                  Ver
                </span>
              </div>
            </div>

            {/* VISTA ESCRITORIO (GRILLA DE 12 COLS CON CONTRASTE COMPLETO) */}
            <div className="hidden md:grid grid-cols-12 items-center gap-4 w-full">
              {/* Índice */}
              <span className="col-span-1 font-mono text-xs text-neutral-400 group-hover:text-neutral-400">
                {String(idx + 1).padStart(2, "0")}
              </span>

              {/* Artista */}
              <span className="col-span-4 font-serif text-base font-normal tracking-tight text-neutral-900 group-hover:text-white truncate">
                {item.artist}
              </span>

              {/* Álbum */}
              <span className="col-span-4 font-sans text-sm font-light text-neutral-700 group-hover:text-neutral-200 truncate">
                {item.title}
              </span>

              {/* Año y Formato */}
              <span className="col-span-2 font-mono text-xs text-neutral-500 group-hover:text-neutral-300 truncate">
                {item.year} • {item.format.replace("Vinilo — ", "")}
              </span>

              {/* Precio */}
              <span className="col-span-1 font-mono text-sm font-bold text-neutral-900 group-hover:text-white text-right">
                Bs. {item.priceBs}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
