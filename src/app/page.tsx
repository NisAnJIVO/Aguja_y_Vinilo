"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { VinylCard, VinylCardProps } from "@/components/catalog/VinylCard";
import { useLanguage } from "@/context/LanguageContext";
import { EditorialCarousel } from "@/components/home/EditorialCarousel";
import { VinylCharacter } from "@/components/ui/VinylCharacter";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { VelocityMarquee } from "@/components/home/VelocityMarquee";
import { InitialPreloader } from "@/components/home/InitialPreloader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { StackedCategories } from "@/components/home/StackedCategories";

// First 3x2 collection: Éxitos de la semana
const FEATURED_RECORDS: VinylCardProps[] = [
  {
    id: "rec-01",
    artist: "Dayglow",
    title: "Can I Call You Tonight?",
    price: "Bs. 230",
    catalogNumber: "AV-01",
    coverImage: "/img/discos/dayglow-fuzzybrain.jpg",
  },
  {
    id: "rec-02",
    artist: "Oasis",
    title: "Live Forever",
    price: "Bs. 270",
    catalogNumber: "AV-02",
    coverImage: "/img/discos/oasis-definitely-maybe.jpg",
  },
  {
    id: "rec-03",
    artist: "Guns N' Roses",
    title: "November Rain",
    price: "Bs. 280",
    catalogNumber: "AV-03",
    coverImage: "/img/discos/guns-n-roses-use-your-illusion-i.jpg",
  },
  {
    id: "rec-04",
    artist: "Milo J, Silvana Estrada",
    title: "Cuando El Agua Hirviendo",
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
    title: "SANTURCE",
    price: "Bs. 220",
    catalogNumber: "AV-06",
    coverImage: "/img/discos/disco-01.jpg",
  },
];

export default function HomePage() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);

  // Animación de entrada brutalista para el Video y H1 del Hero tras concluir el Preloader
  const handleHeroEnter = () => {
    if (videoRef.current) {
      gsap.fromTo(
        videoRef.current,
        { scale: 1.15, filter: "brightness(0.5)" },
        { scale: 1.0, filter: "brightness(1)", duration: 1.4, ease: "power3.out" }
      );
    }
    if (heroTitleRef.current) {
      gsap.fromTo(
        heroTitleRef.current,
        {
          y: 45,
          opacity: 0,
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        },
        {
          y: 0,
          opacity: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.0,
          ease: "power4.out",
          delay: 0.1,
        }
      );
    }
    if (heroSubtitleRef.current) {
      gsap.fromTo(
        heroSubtitleRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.3 }
      );
    }
  };

  return (
    <div className="w-full bg-white text-black font-sans relative">
      {/* =========================================================================
          PRELOADER INICIAL BRUTALISTA (1 VEZ POR SESIÓN)
         ========================================================================= */}
      <InitialPreloader onHeroEnter={handleHeroEnter} />
      
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
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/img/hero-poster.webp"
          preload="auto"
          className="w-full h-full object-cover block will-change-transform"
        >
          <source src="/img/videoplayback.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
          <h1
            ref={heroTitleRef}
            className="font-serif text-white text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-tight sm:leading-none drop-shadow-[0_4px_28px_rgba(0,0,0,0.9)] will-change-transform"
          >
            {t.hero.title}
          </h1>
          <p
            ref={heroSubtitleRef}
            className="font-sans text-white/90 text-xs sm:text-base md:text-lg font-light tracking-tight max-w-2xl mx-auto mt-2.5 sm:mt-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] leading-relaxed will-change-transform"
          >
            {t.hero.description}
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

        {/* =========================================================================
            SECCIÓN SEPARADORA: MARQUEE INFINITO CON GSAP SCROLLTRIGGER (VELOCIDAD & DIRECCIÓN)
           ========================================================================= */}
        <VelocityMarquee />

        {/* =========================================================================
            CATEGORÍAS DESTACADAS: TARJETAS APILADAS ESTILO BASEMENT STUDIO (GSAP SCROLLTRIGGER)
           ========================================================================= */}
        <StackedCategories />
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
          CAPA 3: SEGUNDO TELÓN BLANCO (INFORMACIÓN, ENVÍOS Y REDES - ESTILO VINYL FACTORY)
          Sube deslizándose DIRECTAMENTE por encima del banner anterior, tapándolo.
         ========================================================================= */}
      <div className="relative z-20 bg-white shadow-[0_-20px_45px_rgba(0,0,0,0.25)]">
        <section className="w-full bg-white py-12 sm:py-24 px-4 sm:px-12 lg:px-16">
          <div className="w-full max-w-[1520px] mx-auto">
            
            {/* -------------------------------------------------------------------
                BLOQUE 1: IDENTIDAD & PROPÓSITO (Estilo Vinyl Space Soho)
               ------------------------------------------------------------------- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 items-start">
              <div className="lg:col-span-5">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-black leading-tight">
                  {t.homeManifesto.title}
                </h2>
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mt-2">
                  {t.homeManifesto.badge}
                </span>
              </div>

              <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-neutral-700 leading-relaxed font-light">
                <p>{t.homeManifesto.p1}</p>
                <p>{t.homeManifesto.p2}</p>
                <div className="pt-3">
                  <MagneticButton>
                    <Link
                      href="/discos"
                      className="inline-block px-5 py-2.5 border border-black text-black hover:bg-black hover:text-white transition-colors text-xs font-mono uppercase tracking-wider"
                    >
                      <ScrambleText text={t.homeManifesto.btn} />
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </div>

            {/* Separador sutil */}
            <div className="w-full border-b border-neutral-200 my-12 sm:my-18" />

            {/* -------------------------------------------------------------------
                BLOQUE 2: ENVÍOS & COMPRAS (Estilo Venue Information / Hire Fees)
               ------------------------------------------------------------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16">
              
              {/* Columna Izquierda: Envíos & Cobertura */}
              <div className="space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-widest text-black font-bold">
                  {t.homeShipping.title}
                </h3>
                <div className="space-y-3 text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  <p>
                    <strong className="text-neutral-900 font-medium">{t.homeShipping.destsTitle}</strong> {t.homeShipping.destsText}
                  </p>
                  <p>
                    <strong className="text-neutral-900 font-medium">{t.homeShipping.timeTitle}</strong> {t.homeShipping.timeText}
                  </p>
                  <p>
                    <strong className="text-neutral-900 font-medium">{t.homeShipping.packTitle}</strong> {t.homeShipping.packText}
                  </p>
                  <p>
                    <strong className="text-neutral-900 font-medium">{t.homeShipping.trackTitle}</strong> {t.homeShipping.trackText}
                  </p>
                </div>
              </div>

              {/* Columna Derecha: Compras, Pagos & Garantía */}
              <div className="space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-widest text-black font-bold">
                  {t.homePayment.title}
                </h3>
                <div className="space-y-3 text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  <p>
                    <strong className="text-neutral-900 font-medium">{t.homePayment.storeTitle}</strong> {t.homePayment.storeText}
                  </p>
                  <p>
                    <strong className="text-neutral-900 font-medium">{t.homePayment.methodsTitle}</strong> {t.homePayment.methodsText}
                  </p>
                  <p>
                    <strong className="text-neutral-900 font-medium">{t.homePayment.qualityTitle}</strong> {t.homePayment.qualityText}
                  </p>
                  <p>
                    <strong className="text-neutral-900 font-medium">{t.homePayment.whatsappTitle}</strong> {t.homePayment.whatsappText}
                  </p>
                </div>
              </div>

            </div>

            {/* Separador sutil */}
            <div className="w-full border-b border-neutral-200 my-12 sm:my-18" />

            {/* -------------------------------------------------------------------
                BLOQUE 3: HÍBRIDO REDES SOCIALES & GRAN LOGO EMBLEMA (Estilo Captura 1)
               ------------------------------------------------------------------- */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center justify-between">
              
              {/* Canales y Redes Sociales */}
              <div className="md:col-span-7 space-y-6">
                <div className="space-y-2.5">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold mb-3">
                    {t.homeSocial.title}
                  </h4>
                  <ul className="space-y-2.5 font-serif text-lg sm:text-xl text-neutral-900">
                    <li>
                      <a
                        href="https://www.tiktok.com/@agujayvinilos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline hover:opacity-65 transition-opacity"
                      >
                        TikTok
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/ajuga_y_vinilo/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline hover:opacity-65 transition-opacity"
                      >
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:jivo3534@gmail.com"
                        className="hover:underline hover:opacity-65 transition-opacity"
                      >
                        Gmail
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://wa.me/59168610314"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline hover:opacity-65 transition-opacity"
                      >
                        WhatsApp
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="pt-2 text-xs font-mono text-neutral-400 space-y-1">
                  <p>{t.homeSocial.line1}</p>
                  <p>{t.homeSocial.line2}</p>
                  <p>{t.homeSocial.line3}</p>
                </div>
              </div>

              {/* Gran Emblema Protagonista con la Mascota Cíclope Vinilo */}
              <div className="md:col-span-5 flex flex-col items-center md:items-end justify-center select-none">
                <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full bg-black text-white flex items-center justify-center p-6 sm:p-9 shadow-2xl transition-transform hover:scale-105 duration-300">
                  <VinylCharacter size="100%" inverted={true} pose="headphones" interactive={true} />
                </div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-500 mt-4 text-center md:text-right">
                  Aguja &amp; Vinilo • Bolivia
                </span>
              </div>

            </div>

          </div>
        </section>
      </div>

    </div>
  );
}
