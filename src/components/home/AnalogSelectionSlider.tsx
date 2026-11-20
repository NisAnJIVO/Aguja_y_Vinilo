"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { DISCOS_CATALOG, DiscoItem } from "@/data/discosData";
import { useProductModalStore } from "@/store/productModalStore";
import { useLanguage } from "@/context/LanguageContext";

// 10 piezas de colección para la Selección Analógica
const FEATURED_ANALOG_DISCOS: DiscoItem[] = DISCOS_CATALOG.slice(0, 10);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Carrusel horizontal interactivo inspirado en Aristide Benoist:
 * 1. Arrastre con ratón (drag) y scroll con rueda, con interpolación lineal (lerp) para gran inercia y frenado suave.
 * 2. Las imágenes que cruzan el centro de la pantalla aumentan a scale: 1.06 y nitidez, mientras los extremos se atenúan.
 * 3. Al hacer hover sobre cualquier tarjeta, el resto se atenúa y se revela el título y precio con máscara vertical rápida.
 */
export const AnalogSelectionSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { openModal } = useProductModalStore();
  const { language } = useLanguage();
  const isEn = language === "en";

  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const prevTargetXRef = useRef(0);
  const targetXRef = useRef(0);
  const currentXRef = useRef(0);
  const maxScrollRef = useRef(0);
  const hasMovedRef = useRef(false);

  // Abrir modal solo si fue un clic limpio y no un arrastre
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
        : `Selección analógica "${item.title}" de ${item.artist}. Edición audiófila en formato físico de 180 gramos.`,
      type: "vinyl",
    });
  };

  useEffect(() => {
    const updateBounds = () => {
      if (!trackRef.current || !containerRef.current) return;
      const trackW = trackRef.current.scrollWidth;
      const contW = containerRef.current.clientWidth;
      maxScrollRef.current = Math.max(0, trackW - contW + 64);
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);

    const container = containerRef.current;
    if (!container) return;

    // 1. Mouse Drag Interactions
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      startXRef.current = e.clientX;
      prevTargetXRef.current = targetXRef.current;
      hasMovedRef.current = false;
      container.style.cursor = "grabbing";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const diff = (e.clientX - startXRef.current) * 1.35;
      if (Math.abs(diff) > 5) {
        hasMovedRef.current = true;
      }
      targetXRef.current = prevTargetXRef.current + diff;
      // Resistencia elástica ligera
      targetXRef.current = Math.max(-maxScrollRef.current - 60, Math.min(60, targetXRef.current));
    };

    const onMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      container.style.cursor = "grab";
      // Rebote suave a los límites
      if (targetXRef.current < -maxScrollRef.current) targetXRef.current = -maxScrollRef.current;
      if (targetXRef.current > 0) targetXRef.current = 0;
    };

    // 2. Wheel Scroll Interaction con mucha inercia
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) > 0) {
        targetXRef.current -= delta * 0.95;
        targetXRef.current = Math.max(-maxScrollRef.current, Math.min(0, targetXRef.current));
      }
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("wheel", onWheel, { passive: true });

    // 3. Loop con lerp e inspección de distancia al centro (efecto Aristide Benoist)
    const onTick = () => {
      // Interpolación lineal continua para frenado suave y gran inercia
      currentXRef.current = lerp(currentXRef.current, targetXRef.current, 0.075);

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${currentXRef.current}px, 0, 0)`;
      }

      // Proximidad al centro de la pantalla
      const viewportCenter = window.innerWidth / 2;
      const maxDistance = window.innerWidth * 0.5;

      cardsRef.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - viewportCenter);
        const norm = Math.max(0, Math.min(1, 1 - dist / maxDistance));

        // Solo si no estamos hovereando una tarjeta específica aplicamos la escala centrada
        if (!hoveredCardId) {
          const scale = 0.98 + norm * 0.08; // De 0.98 a 1.06 al centro
          const opacity = 0.65 + norm * 0.35; // De 0.65 a 1.0
          card.style.transform = `scale(${scale})`;
          card.style.opacity = `${opacity}`;
        }
      });
    };

    gsap.ticker.add(onTick);

    return () => {
      window.removeEventListener("resize", updateBounds);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("wheel", onWheel);
      gsap.ticker.remove(onTick);
    };
  }, [hoveredCardId]);

  return (
    <section className="w-full bg-[#080808] text-white py-14 sm:py-20 overflow-hidden border-b border-white/15 select-none">
      {/* Encabezado Editorial */}
      <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="border-b border-white/15 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block mb-1">
              [ 03 // SELECCIÓN ANALÓGICA AUDIÓFILA ]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white uppercase">
              SELECCIÓN ANALÓGICA
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-400">
            <span className="inline-block w-2 h-2 bg-white animate-pulse" />
            <span>[ ARRASTRA O RUEDA DE SCROLL ]</span>
          </div>
        </div>
      </div>

      {/* Contenedor del Slider con Drag y Cursor Grab */}
      <div
        ref={containerRef}
        data-cursor="SCROLL"
        onMouseEnter={() => setIsHoveringSlider(true)}
        onMouseLeave={() => {
          setIsHoveringSlider(false);
          setHoveredCardId(null);
        }}
        className="w-full relative px-4 sm:px-6 lg:px-8 cursor-grab active:cursor-grabbing overflow-visible"
        style={{ willChange: "transform" }}
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
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                onClick={() => handleCardClick(item)}
                onMouseEnter={() => setHoveredCardId(item.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                data-cursor="VER"
                className={`relative shrink-0 w-[260px] sm:w-[310px] md:w-[350px] aspect-[3/4] bg-[#121212] border border-white/20 group-hover/item:border-white/60 group-hover/item:shadow-[0_0_25px_rgba(255,255,255,0.15)] select-none overflow-hidden transition-all duration-200 group/item ${
                  isThisHovered
                    ? "!opacity-100 !scale-105 z-20 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                    : isAnyOtherHovered
                    ? "!opacity-35"
                    : ""
                }`}
                style={{ willChange: "transform, opacity" }}
              >
                {/* Portada Editorial con Filtro Bürocratik */}
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 80vw, 350px"
                    className="object-cover saturate-75 contrast-110 group-hover/item:saturate-100 group-hover/item:contrast-100 group-hover/item:brightness-105 group-hover/item:scale-105 transition-[filter,transform] duration-200 ease-out"
                  />
                  {/* Destello de contraste rápido tipo Bürocratik */}
                  <div className="absolute inset-0 bg-white/20 pointer-events-none opacity-0 group-hover/item:opacity-100 transition-opacity duration-100 mix-blend-overlay" />

                  {/* Etiqueta superior minimalista */}
                  <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-xs font-mono text-[9px] text-white px-2 py-0.5 uppercase tracking-wider border border-white/20">
                    N° {String(index + 1).padStart(2, "0")} // ARCHIVE
                  </div>
                </div>

                {/* Máscara Vertical Rápida que revela Título y Precio al hacer hover */}
                <div
                  className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black via-black/95 to-transparent text-white border-t border-white/20 transition-transform duration-200 ease-out translate-y-full group-hover/item:translate-y-0"
                  style={{ willChange: "transform" }}
                >
                  <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                    {item.year} • {item.format}
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl font-normal text-white uppercase tracking-tight line-clamp-1 mt-0.5">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs text-neutral-300 line-clamp-1 font-light">
                    {item.artist}
                  </p>
                  <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-2 font-mono">
                    <span className="text-[10px] text-neutral-400 tracking-wider">
                      PRECIO BOLIVIA
                    </span>
                    <span className="text-sm font-bold text-white">
                      Bs. {item.priceBs}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
