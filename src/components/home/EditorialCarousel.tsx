"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface CarouselSlide {
  id: number;
  src: string;
  alt: string;
  type?: "default" | "white-right" | "blurred-center" | "contain";
  objectPosition?: string;
}

const SLIDES: CarouselSlide[] = [
  { id: 1, src: "/img/carrucel/1.webp", alt: "Audio Waveform Minimal", type: "default", objectPosition: "center" },
  { id: 2, src: "/img/carrucel/2.webp", alt: "Vinyl Record Stereo", type: "default", objectPosition: "center" },
  { id: 3, src: "/img/carrucel/3.webp", alt: "Tame Impala - Currents", type: "default", objectPosition: "center" },
  { id: 4, src: "/img/carrucel/4.webp", alt: "Melendi", type: "default", objectPosition: "center" },
  { id: 5, src: "/img/carrucel/5.webp", alt: "Joji", type: "default", objectPosition: "top" },
  { id: 6, src: "/img/carrucel/6.webp", alt: "Sade - Love Deluxe", type: "white-right" },
  { id: 7, src: "/img/carrucel/7.webp", alt: "Analog Studio", type: "default", objectPosition: "top" },
  { id: 8, src: "/img/carrucel/8.webp", alt: "Thom Yorke - Radiohead", type: "contain" },
  { id: 9, src: "/img/carrucel/9.webp", alt: "Arctic Monkeys", type: "default", objectPosition: "center" },
  { id: 10, src: "/img/carrucel/10.webp", alt: "Cinematic Monochrome Portrait", type: "default", objectPosition: "center" },
];

export const EditorialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const totalSlides = SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play continuo cada 2.0 segundos sin bloquearse por el cursor durante el scroll
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Soporte para gestos táctiles (Swipe)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      data-cursor="SCROLL"
    >
      {/* Contenedor de Diapositivas */}
      {SLIDES.map((slide, index) => {
        const isActive = index === currentIndex;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Caso Especial 6: Cuadrada, sin recorte, a la derecha con fondo blanco */}
            {slide.type === "white-right" && (
              <div className="w-full h-full bg-white flex justify-end items-center relative overflow-hidden">
                <div className="relative h-full aspect-square max-w-[85vw] sm:max-w-none">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="object-contain object-right"
                    priority={index === 0}
                  />
                </div>
              </div>
            )}

            {/* Caso Especial 10: Imagen más pequeña/cuadrada con fondo difuminado ambiental de la misma foto */}
            {slide.type === "blurred-center" && (
              <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
                {/* Fondo difuminado ambiental limpio de la misma imagen */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <Image
                    src={slide.src}
                    alt=""
                    fill
                    unoptimized
                    sizes="100vw"
                    className="object-cover scale-110 blur-2xl opacity-60 brightness-90"
                  />
                </div>

                {/* Imagen principal nítida centrada completa */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-4 sm:p-8">
                  <div className="relative w-full h-full max-w-[1200px] flex items-center justify-center">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 1200px"
                      className="object-contain object-center drop-shadow-2xl"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Caso Especial 8 (Thom Yorke): Fondo blanco puro y centrado sin difuminaciones negras */}
            {slide.type === "contain" && (
              <div className="relative w-full h-full bg-white flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full max-w-[1300px] flex items-center justify-center p-4 sm:p-8">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 1300px"
                    className="object-contain object-center"
                    priority={index === 0}
                  />
                </div>
              </div>
            )}

            {/* Diapositivas Estándar (1, 2, 3, 4, 5, 7, 9): Imagen panorámica 100% limpia sin ninguna sombra ni degradado negro */}
            {slide.type === "default" && (
              <div className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  unoptimized
                  sizes="100vw"
                  style={{ objectPosition: slide.objectPosition || "center" }}
                  className="object-cover w-full h-full"
                  priority={index === 0}
                />
              </div>
            )}
          </div>
        );
      })}

      {/* Paginación en Barra / Píldoras en la parte inferior */}
      <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-md border border-white/15 rounded-full shadow-lg">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goToSlide(i)}
            aria-label={`Ir a diapositiva ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === currentIndex
                ? "w-7 h-2 bg-white"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

