"use client";

import React from "react";
import { VinylCard, VinylCardProps } from "@/components/catalog/VinylCard";
import { useLanguage } from "@/context/LanguageContext";
import { EditorialCarousel } from "@/components/home/EditorialCarousel";

// First 3x2 collection: Éxitos de la semana
const FEATURED_RECORDS: VinylCardProps[] = [
  {
    id: "rec-01",
    artist: "Dayglow",
    title: "Fuzzybrain",
    price: "Bs. 230",
    catalogNumber: "AV-01",
    coverImage: "/img/discos/dayglow-fuzzybrain.jpg",
  },
  {
    id: "rec-02",
    artist: "Oasis",
    title: "Definitely Maybe",
    price: "Bs. 270",
    catalogNumber: "AV-02",
    coverImage: "/img/discos/oasis-definitely-maybe.jpg",
  },
  {
    id: "rec-03",
    artist: "Guns N' Roses",
    title: "Use Your Illusion I",
    price: "Bs. 280",
    catalogNumber: "AV-03",
    coverImage: "/img/discos/guns-n-roses-use-your-illusion-i.jpg",
  },
  {
    id: "rec-04",
    artist: "Milo j",
    title: "La Vida Era Más Corta",
    price: "Bs. 220",
    catalogNumber: "AV-04",
    coverImage: "/img/discos/miloj-la-vida-era-mas-corta.jpg",
  },
  {
    id: "rec-05",
    artist: "Joji",
    title: "SMITHEREENS",
    price: "Bs. 250",
    catalogNumber: "AV-05",
    coverImage: "/img/discos/disco-21.jpg",
  },
  {
    id: "rec-06",
    artist: "Nsqk",
    title: "mosca",
    price: "Bs. 220",
    catalogNumber: "AV-06",
    coverImage: "/img/discos/disco-01.jpg",
  },
];

// Second 3x2 collection: Nuevos lanzamientos (abajo del banner editorial)
const NEW_RELEASES_RECORDS: VinylCardProps[] = [
  {
    id: "rec-07",
    artist: "Paco de Lucía",
    title: "Solo Quiero Caminar",
    price: "£30.00",
    catalogNumber: "VF-307",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/4/47/%22Solo_Quiero_Caminar%22_by_Paco_de_Lucia%3B_Side_1_label_of_the_Philips_LP_release.jpg",
  },
  {
    id: "rec-08",
    artist: "Emerson, Lake & Palmer",
    title: "Brain Salad Surgery (180g Pressing)",
    price: "£32.00",
    catalogNumber: "VF-308",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Emerson_Lake_%26_Palmer_-_LP_with_Manticore.jpg",
  },
  {
    id: "rec-09",
    artist: "ABBA",
    title: "The Best of ABBA (1975 Virgin Vinyl)",
    price: "£26.00",
    catalogNumber: "VF-309",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Best_of_ABBA_vinyl_1975.jpg",
  },
  {
    id: "rec-10",
    artist: "Almendra",
    title: "Almendra (Original Master 180g)",
    price: "£34.00",
    catalogNumber: "VF-310",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Almendra_%281969%29%2C_1st_album_by_Almendra_-_Long_Play_vinyl_record_-_RCA_Victor_Yellow_label.jpg",
  },
  {
    id: "rec-11",
    artist: "Sui Generis",
    title: "Confesiones de Invierno",
    price: "£29.00",
    catalogNumber: "VF-311",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/3/32/Confesiones_de_Invierno.jpg",
  },
  {
    id: "rec-12",
    artist: "Kraftwerk",
    title: "Computer World (Audiophile Gatefold)",
    price: "£35.00",
    catalogNumber: "VF-312",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/7/73/150518-Philips-Kraftwerk-01.jpg",
  },
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-white text-black font-sans relative">
      
      {/* =========================================================================
          ESPACIADOR HERO: Ocupa el espacio del video en el flujo del documento
         ========================================================================= */}
      <div
        aria-hidden="true"
        className="w-full h-[55vh] sm:h-[65vh] md:h-[75vh] pointer-events-none"
      />

      {/* =========================================================================
          CAPA 0: VIDEO INMÓVIL (0PX DE DESPLAZAMIENTO)
         ========================================================================= */}
      <div className="fixed top-[68px] left-0 right-0 z-0 h-[55vh] sm:h-[65vh] md:h-[75vh] bg-black overflow-hidden flex items-center justify-center pointer-events-none select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover block"
        >
          <source src="/img/videoplayback.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
          <h1
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              letterSpacing: "-0.03em",
            }}
            className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-none drop-shadow-[0_4px_28px_rgba(0,0,0,0.9)]"
          >
            Aguja &amp; Vinilo
          </h1>
          <p
            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
            className="text-white/90 text-sm sm:text-base md:text-lg font-normal tracking-tight max-w-2xl mx-auto mt-3 sm:mt-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] leading-relaxed"
          >
            En este sitio puedes encontrar tu catálogo favorito de discos de vinilo, tornamesas y tocadiscos analógicos, muebles de diseño para tus equipos y objetos de colección musical.
          </p>
        </div>
      </div>

      {/* =========================================================================
          CAPA 1: PRIMER TELÓN BLANCO (ÉXITOS DE LA SEMANA)
          Sube y cubre el video superior al hacer scroll
         ========================================================================= */}
      <div className="relative z-10 bg-white shadow-[0_-20px_45px_rgba(0,0,0,0.22)]">
        <section className="w-full bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-[1520px] mx-auto">
            {/* Encabezado Editorial Serif */}
            <div className="mb-10 sm:mb-14">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-black leading-tight">
                {t.catalog.title}
              </h2>
              <p className="font-serif italic text-base sm:text-lg lg:text-xl text-gray-600 font-light mt-2">
                {t.catalog.subtitle}
              </p>
            </div>

            {/* Grilla limpia de 3 columnas x 2 filas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 sm:gap-x-16 lg:gap-x-20 gap-y-12 sm:gap-y-16">
              {FEATURED_RECORDS.map((record) => (
                <VinylCard key={record.id} {...record} />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* =========================================================================
          CAPA 2: CARRUSEL EDITORIAL STICKY (10 IMÁGENES)
          Al scrollear hasta el navbar (top-[68px]), SE QUEDA ESTÁTICO aquí,
          mientras la siguiente sección blanca sube tapándolo como un segundo telón.
         ========================================================================= */}
      <section className="sticky top-[68px] z-10 w-full h-[55vh] sm:h-[65vh] md:h-[75vh] bg-black overflow-hidden select-none">
        <EditorialCarousel />
      </section>

      {/* =========================================================================
          CAPA 3: SEGUNDO TELÓN BLANCO (NUEVOS LANZAMIENTOS)
          Sube deslizándose DIRECTAMENTE por encima del banner anterior, tapándolo.
         ========================================================================= */}
      <div className="relative z-20 bg-white shadow-[0_-20px_45px_rgba(0,0,0,0.25)]">
        <section className="w-full bg-white py-14 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-[1520px] mx-auto">
            {/* Encabezado Editorial Serif */}
            <div className="mb-10 sm:mb-14">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-black leading-tight">
                {t.catalog.title2}
              </h2>
              <p className="font-serif italic text-base sm:text-lg lg:text-xl text-gray-600 font-light mt-2">
                {t.catalog.subtitle2}
              </p>
            </div>

            {/* Segunda grilla limpia de 3 columnas x 2 filas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 sm:gap-x-16 lg:gap-x-20 gap-y-12 sm:gap-y-16">
              {NEW_RELEASES_RECORDS.map((record) => (
                <VinylCard key={record.id} {...record} />
              ))}
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
