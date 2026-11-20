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
    title: "Discos de Vinilo",
    description:
      "Ediciones originales, prensados en vinilo virgen de 180 gramos y reediciones audiófilas de colección seleccionadas para disfrutar la música en su formato más auténtico.",
    image: "/img/discos/oasis-definitely-maybe.jpg",
    href: "/discos",
    ctaText: "Explorar Discos",
    specs: [
      { label: "Prensado", value: "180g Vinilo Virgen" },
      { label: "Velocidades", value: "33 ⅓ y 45 RPM" },
      { label: "Curaduría", value: "Nuevos y Sellados" },
      { label: "Envíos", value: "Todo el país" },
    ],
  },
  {
    id: "cat-tocadiscos",
    index: "02",
    title: "Tocadiscos",
    description:
      "Tornamesas de alta fidelidad con cápsulas magnéticas Audio-Technica, calibración precisa y diseño pensado para extraer hasta el último matiz sonoro del surco.",
    image: "/img/Tocadiscos/1.jpg",
    href: "/tocadiscos",
    ctaText: "Ver Tocadiscos",
    specs: [
      { label: "Tracción", value: "Correa y Directa" },
      { label: "Cápsula", value: "Audio-Technica MM" },
      { label: "Preamp", value: "Phono / Línea" },
      { label: "Garantía", value: "1 Año Oficial" },
    ],
  },
  {
    id: "cat-racks",
    index: "03",
    title: "Racks y Muebles",
    description:
      "Mobiliario especializado en madera noble y herrería estructural, fabricado artesanalmente para organizar y proteger tu colección con firmeza acústica.",
    image: "/img/Muebles/1.jpg",
    href: "/racks",
    ctaText: "Ver Racks",
    specs: [
      { label: "Capacidad", value: "80 a 450 vinilos" },
      { label: "Materiales", value: "Madera maciza y hierro" },
      { label: "Estructura", value: "Antivibratoria" },
      { label: "Origen", value: "Hecho a mano en Bolivia" },
    ],
  },
  {
    id: "cat-extras",
    index: "04",
    title: "Extras y Cuidado",
    description:
      "Fundas protectoras antiestáticas, cepillos de fibra de carbono para mantenimiento diario, indumentaria serigrafiada y accesorios esenciales para tus discos.",
    image: "/img/extras/1.jpg",
    href: "/extras",
    ctaText: "Ver Accesorios",
    specs: [
      { label: "Protección", value: "Fundas antiestáticas" },
      { label: "Mantenimiento", value: "Cepillos conductivos" },
      { label: "Prendas", value: "100% Algodón 240g" },
      { label: "Disponibilidad", value: "Inmediata" },
    ],
  },
];

export const StackedCategories: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Solo en desktop: escala sutil de 1 a 0.96 sin oscurecimiento
    mm.add("(min-width: 768px)", () => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          const nextCard = cards[i + 1];

          gsap.to(card, {
            scale: 0.96,
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
      className="w-full bg-[#F6F6F6] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-black/10 select-none"
    >
      {/* Encabezado limpio y directo */}
      <div className="w-full max-w-[1520px] mx-auto mb-10 sm:mb-14">
        <div className="border-b border-black/15 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#111111]">
              Categorías
            </h2>
            <p className="font-sans text-sm sm:text-base text-neutral-600 mt-1 font-light">
              Discos de vinilo, tocadiscos de alta fidelidad, racks artesanales y cuidado analógico.
            </p>
          </div>
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
            Colección Oficial • Bolivia
          </span>
        </div>
      </div>

      {/* Tarjetas apiladas con fondo claro y bordes finos */}
      <div className="w-full max-w-[1520px] mx-auto relative flex flex-col gap-8 md:gap-0">
        {CATEGORIES.map((cat, index) => (
          <div
            key={cat.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            style={{ zIndex: index + 10 }}
            className="card-item relative md:sticky md:top-[72px] w-full min-h-[auto] md:min-h-[80vh] bg-white text-[#111111] border border-black/10 rounded-none overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.06)] mb-0 md:mb-[12vh] last:md:mb-0 will-change-transform"
          >
            {/* Barra superior de la tarjeta */}
            <div className="flex items-start justify-between border-b border-black/10 pb-4 sm:pb-6">
              <div className="flex flex-col">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-medium">
                  Sección {cat.index}
                </span>
                <span className="font-sans text-xs text-neutral-400">
                  Aguja &amp; Vinilo
                </span>
              </div>

              {/* Índice numérico gigante pero sutil */}
              <div className="font-mono font-black text-6xl sm:text-8xl md:text-9xl leading-none tracking-tighter text-black/10 select-none">
                {cat.index}
              </div>
            </div>

            {/* Contenido central: Grilla 2 columnas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center my-6 sm:my-auto">
              {/* Información editorial */}
              <div className="lg:col-span-6 flex flex-col text-left">
                <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#111111] tracking-tight leading-tight">
                  {cat.title}
                </h3>
                <p className="font-sans text-neutral-600 text-sm sm:text-base font-light leading-relaxed mt-4 max-w-xl">
                  {cat.description}
                </p>

                {/* Ficha técnica clara */}
                <div className="grid grid-cols-2 gap-4 font-mono text-[11px] uppercase tracking-wider border-t border-black/10 pt-5 mt-6">
                  {cat.specs.map((sp, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-neutral-400 text-[10px]">{sp.label}</span>
                      <span className="text-[#111111] font-semibold truncate">{sp.value}</span>
                    </div>
                  ))}
                </div>

                {/* Botón CTA */}
                <div className="pt-6">
                  <MagneticButton>
                    <Link
                      href={cat.href}
                      data-cursor="VER"
                      className="inline-flex items-center gap-3 px-6 py-3.5 bg-black text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-none shadow-sm"
                    >
                      <ScrambleText text={cat.ctaText} />
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </MagneticButton>
                </div>
              </div>

              {/* Imagen editorial */}
              <div className="lg:col-span-6 w-full">
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#EEEEEE] border border-black/10 rounded-none overflow-hidden group/img shadow-sm">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover/img:scale-104 transition-transform duration-500 ease-out"
                  />
                </div>
              </div>
            </div>

            {/* Barra inferior */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-black/10 pt-4 font-mono text-[11px] text-neutral-500 tracking-wider gap-1">
              <span>Aguja &amp; Vinilo • Tienda Especializada</span>
              <span>Envíos seguros a los 9 departamentos</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
