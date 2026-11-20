"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DISCOS_CATALOG, DiscoItem } from "@/data/discosData";
import { useProductModalStore } from "@/store/productModalStore";
import { useLanguage } from "@/context/LanguageContext";

const FEATURED_ANALOG_DISCOS: DiscoItem[] = DISCOS_CATALOG.slice(0, 10);

export const AnalogSelectionSlider: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const { openModal } = useProductModalStore();
  const { language } = useLanguage();
  const isEn = language === "en";

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const hasMovedRef = useRef(false);

  const handleCardClick = (item: DiscoItem) => {
    if (hasMovedRef.current) return;
    openModal({
      id: item.id,
      title: item.title,
      subtitle: item.artist,
      categoryLabel: isEn ? `Vinyl • ${item.year}` : `Vinilo • ${item.year}`,
      format: item.format,
      priceBs: item.priceBs,
      image: item.coverImage,
      description: isEn
        ? `Analog selection "${item.title}" by ${item.artist}. 180g audiophile physical pressing.`
        : `Selección en vinilo "${item.title}" de ${item.artist}. Edición audiófila de 180 gramos.`,
      type: "vinyl",
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    // Scroll horizontal real en Desktop (ancho >= 768px) con pin y scrub
    mm.add("(min-width: 768px)", () => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 80);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top 68px",
          end: () => "+=" + (track.scrollWidth - window.innerWidth + 80),
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(self.progress);
          },
        },
      });

      // Refrescar ScrollTrigger cuando las imágenes carguen
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 400);

      return () => {
        clearTimeout(timer);
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    // Soporte para arrastre con el mouse (drag)
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      startXRef.current = e.clientX;
      hasMovedRef.current = false;
      section.style.cursor = "grabbing";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      if (Math.abs(e.clientX - startXRef.current) > 6) {
        hasMovedRef.current = true;
      }
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      section.style.cursor = "default";
    };

    section.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      mm.revert();
      section.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white text-[#111111] py-14 sm:py-20 overflow-hidden border-b border-black/10 select-none"
    >
      {/* Encabezado Editorial Limpio */}
      <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <div className="border-b border-black/15 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#111111]">
              Selección Analógica
            </h2>
            <p className="font-sans text-sm sm:text-base text-neutral-600 mt-1 font-light">
              Joyas de colección y lanzamientos destacados en formato físico.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-500">
            <span>Scroll o arrastra para recorrer</span>
            <span className="hidden sm:inline">&rarr;</span>
          </div>
        </div>
      </div>

      {/* Contenedor del Carrusel con Pinning Horizontal */}
      <div
        data-cursor="SCROLL"
        className="w-full relative px-4 sm:px-6 lg:px-8 overflow-x-auto md:overflow-visible no-scrollbar"
      >
        <div
          ref={trackRef}
          className="flex items-center gap-6 sm:gap-8 w-max will-change-transform py-4"
        >
          {FEATURED_ANALOG_DISCOS.map((item, index) => {
            const isThisHovered = hoveredCardId === item.id;
            const isAnyOtherHovered = hoveredCardId !== null && !isThisHovered;

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item)}
                onMouseEnter={() => setHoveredCardId(item.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                data-cursor="VER"
                className={`relative shrink-0 w-[240px] sm:w-[280px] md:w-[320px] bg-white border border-black/10 select-none overflow-hidden transition-all duration-200 cursor-pointer shadow-sm group/item ${
                  isThisHovered
                    ? "!scale-104 shadow-lg z-20"
                    : isAnyOtherHovered
                    ? "!opacity-45"
                    : ""
                }`}
              >
                {/* Portada Cuadrada */}
                <div className="relative w-full aspect-square bg-neutral-100 overflow-hidden">
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 80vw, 320px"
                    className="object-cover group-hover/item:scale-104 transition-transform duration-300 ease-out"
                  />
                  {/* Número de archivo limpio */}
                  <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-xs font-mono text-[9px] text-white px-2 py-0.5 uppercase tracking-wider">
                    N° {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Barra rápida de Título y Precio que sube en hover con máscara */}
                  <div className="absolute inset-x-0 bottom-0 p-3.5 bg-black/90 backdrop-blur-xs text-white transition-transform duration-200 ease-out translate-y-full group-hover/item:translate-y-0">
                    <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider line-clamp-1">
                      {item.artist}
                    </p>
                    <h4 className="font-serif text-sm font-normal text-white uppercase tracking-tight line-clamp-1 mt-0.5">
                      {item.title}
                    </h4>
                    <p className="font-mono text-xs font-bold text-white mt-1">
                      Bs. {item.priceBs}
                    </p>
                  </div>
                </div>

                {/* Pie de la tarjeta */}
                <div className="p-3 bg-white flex flex-col text-left border-t border-black/5">
                  <span className="font-serif text-sm font-normal text-[#111111] line-clamp-1">
                    {item.artist}
                  </span>
                  <span className="font-sans text-xs text-neutral-500 line-clamp-1 font-light">
                    {item.title}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#111111] mt-1">
                    Bs. {item.priceBs}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Barra de progreso minimalista de 1px abajo */}
      <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 mt-6 hidden md:block">
        <div className="w-full h-[1px] bg-black/15 overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-75"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
};
