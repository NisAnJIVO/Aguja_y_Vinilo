"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrambleText } from "@/components/ui/ScrambleText";

interface CategoryCard {
  id: string;
  index: string;
  categoryTag: string;
  title: string;
  description: string;
  image: string;
  href: string;
  ctaText: string;
  specs: { label: string; value: string }[];
}

const CATEGORIES: CategoryCard[] = [
  {
    id: "cat-discos",
    index: "01",
    categoryTag: "01 // ARCHIVO PRINCIPAL",
    title: "DISCOS DE VINILO",
    description:
      "Catálogo curado de prensados audiófilos de 180 gramos, ediciones especiales en vinilo virgen, clásicos legendarios y joyas contemporáneas de colección.",
    image: "/img/discos/oasis-definitely-maybe.jpg",
    href: "/discos",
    ctaText: "EXPLORAR DISCOS",
    specs: [
      { label: "PRENSADO", value: "180G VIRGIN VINYL" },
      { label: "VELOCIDAD", value: "33 ⅓ & 45 RPM" },
      { label: "CURATORÍA", value: "ALTA FIDELIDAD" },
      { label: "ESTADO", value: "SELLADOS & NUEVOS" },
    ],
  },
  {
    id: "cat-tocadiscos",
    index: "02",
    categoryTag: "02 // HARDWARE ANALÓGICO",
    title: "TOCADISCOS HI-FI",
    description:
      "Reproductores de sonido de alta fidelidad con cápsulas magnéticas Audio-Technica, calibración audiófila y componentes aislados contra resonancias mecánicas.",
    image: "/img/Tocadiscos/1.jpg",
    href: "/tocadiscos",
    ctaText: "VER TOCADISCOS",
    specs: [
      { label: "TRACCIÓN", value: "BELT / DIRECT DRIVE" },
      { label: "CÁPSULA", value: "AUDIO-TECHNICA MM" },
      { label: "CONECTIVIDAD", value: "PHONO / LINE PREAMP" },
      { label: "GARANTÍA", value: "1 AÑO OFICIAL" },
    ],
  },
  {
    id: "cat-racks",
    index: "03",
    categoryTag: "03 // MOBILIARIO MODULAR",
    title: "RACKS PARA VINILOS",
    description:
      "Mobiliario especializado en madera noble y herrería estructural diseñado para almacenar y organizar tu colección con rigidez acústica superior.",
    image: "/img/Muebles/1.jpg",
    href: "/racks",
    ctaText: "EXPLORAR RACKS",
    specs: [
      { label: "CAPACIDAD", value: "80 HASTA 450 LPS" },
      { label: "MATERIAL", value: "MADERA NOBLE & HIERRO" },
      { label: "ESTABILIDAD", value: "ANTIVIBRATORIA" },
      { label: "ORIGEN", value: "HECHO A MANO EN BOLIVIA" },
    ],
  },
  {
    id: "cat-extras",
    index: "04",
    categoryTag: "04 // ACCESORIOS & MERCH",
    title: "EXTRAS & COSMOS",
    description:
      "Fundas antiestáticas de precisión, cepillos de fibra de carbono para mantenimiento, poleras serigrafiadas y merchandising oficial para amantes del formato físico.",
    image: "/img/extras/1.jpg",
    href: "/extras",
    ctaText: "VER ACCESORIOS",
    specs: [
      { label: "PROTECCIÓN", value: "FUNDAS POLIPROPILENO" },
      { label: "LIMPIEZA", value: "CEPILLOS CONDUCTIVOS" },
      { label: "TEXTIL", value: "100% ALGODÓN 240G" },
      { label: "EDICIÓN", value: "LIMITADA AGUJA & VINILO" },
    ],
  },
];

/**
 * Sección de Categorías Destacadas inspirada en Basement Studio Featured Projects.
 * Tarjetas apiladas con GSAP ScrollTrigger:
 * - Desktop: sticky top-[72px], mientras la siguiente tarjeta entra, la anterior se encoge (scale: 0.92)
 *   y oscurece (brightness: 0.4) con scrub: true.
 * - Mobile: scroll vertical limpio sin pinning ni transformaciones.
 */
export const StackedCategories: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Solo para escritorio (ancho >= 768px)
    mm.add("(min-width: 768px)", () => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      cards.forEach((card, i) => {
        // Todas las tarjetas menos la última sufren el efecto de profundidad al superponerse la siguiente
        if (i < cards.length - 1) {
          const nextCard = cards[i + 1];

          gsap.to(card, {
            scale: 0.92,
            filter: "brightness(0.4)",
            ease: "none",
            transformOrigin: "center top",
            scrollTrigger: {
              trigger: nextCard,
              start: "top 80%",
              end: "top 72px",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#EDEDED] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-black select-none"
    >
      {/* Encabezado Brutalista de la Sección */}
      <div className="w-full max-w-[1520px] mx-auto mb-8 sm:mb-12">
        <div className="border-b border-black/25 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-1">
              [ 02 // SECCIONES ESPECIALIZADAS ]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-black">
              CATEGORÍAS DESTACADAS
            </h2>
          </div>
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
            BASEMENT STUDIO ARCHITECTURE // 4 COLECCIONES
          </span>
        </div>
      </div>

      {/* Contenedor de Tarjetas Apiladas (Sticky en Desktop, Flujo Normal en Móvil) */}
      <div className="w-full max-w-[1520px] mx-auto relative flex flex-col gap-8 md:gap-0">
        {CATEGORIES.map((cat, index) => (
          <div
            key={cat.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            style={{ zIndex: index + 10 }}
            className="card-item relative md:sticky md:top-[72px] w-full min-h-[auto] md:min-h-[85vh] bg-[#0A0A0A] text-white border border-white/20 rounded-none overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)] mb-0 md:mb-[15vh] last:md:mb-0 will-change-transform"
          >
            {/* Barra Superior de la Tarjeta */}
            <div className="flex items-start justify-between border-b border-white/15 pb-4 sm:pb-6">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold">
                  {cat.categoryTag}
                </span>
                <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider hidden sm:block">
                  FORMATO FÍSICO // AGUJA &amp; VINILO • BOLIVIA
                </span>
              </div>

              {/* Índice numérico gigante en la esquina */}
              <div className="font-mono font-black text-6xl sm:text-8xl md:text-9xl leading-none tracking-tighter text-white/20 select-none">
                {cat.index}
              </div>
            </div>

            {/* Contenido Central: Grilla 2 Columnas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-6 sm:my-auto">
              {/* Columna Izquierda: Información Editorial */}
              <div className="lg:col-span-6 flex flex-col text-left">
                <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white uppercase tracking-tight leading-tight">
                  {cat.title}
                </h3>
                <p className="font-sans text-neutral-300 text-sm sm:text-base font-light leading-relaxed mt-4 max-w-xl">
                  {cat.description}
                </p>

                {/* Metadata técnica en la esquina inferior */}
                <div className="grid grid-cols-2 gap-3 font-mono text-[11px] uppercase tracking-wider border-t border-white/15 pt-4 mt-6">
                  {cat.specs.map((sp, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-neutral-500 text-[10px]">{sp.label}</span>
                      <span className="text-neutral-200 font-medium truncate">{sp.value}</span>
                    </div>
                  ))}
                </div>

                {/* Botón CTA Magnético con Scramble */}
                <div className="pt-6">
                  <MagneticButton>
                    <Link
                      href={cat.href}
                      data-cursor="VER"
                      className="inline-flex items-center gap-3 px-6 py-3.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors rounded-none shadow-md"
                    >
                      <ScrambleText text={cat.ctaText} />
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </MagneticButton>
                </div>
              </div>

              {/* Columna Derecha: Gran Imagen Editorial con Borde Fino */}
              <div className="lg:col-span-6 w-full">
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-neutral-900 border border-white/20 rounded-none overflow-hidden group/img shadow-2xl">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Etiqueta técnica sobre la imagen */}
                  <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-xs font-mono text-[10px] text-white px-2.5 py-1 uppercase tracking-wider border border-white/20 select-none">
                    FIG. {cat.index} // ARCHIVAL REPRODUCTION
                  </div>
                </div>
              </div>
            </div>

            {/* Barra Inferior de la Tarjeta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-white/15 pt-4 font-mono text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-widest gap-1">
              <span>AGUJA &amp; VINILO • RED NACIONAL BOLIVIA</span>
              <span>180G HIGH FIDELITY PRESSINGS // SYS_ID: {cat.id.toUpperCase()}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
