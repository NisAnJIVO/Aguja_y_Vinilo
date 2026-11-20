"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { VinylCharacter } from "@/components/ui/VinylCharacter";
import { HoverRollText } from "@/components/ui/HoverRollText";

export const Footer: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <footer className="relative w-full bg-black text-white overflow-hidden">
      {/* Fondo con suspiria1.png anclado arriba (object-top), cortando la parte inferior desocupada */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/img/suspiria1.png"
          alt="Suspiria Background Footer"
          fill
          sizes="100vw"
          className="object-cover object-top w-full h-full"
          priority
        />
        {/* Capa oscura para máxima legibilidad de los textos y enlaces */}
        <div className="absolute inset-0 bg-black/60 sm:bg-black/55" />
      </div>

      {/* Contenido Completo del Footer */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-4 sm:px-12 lg:px-16 pt-10 sm:pt-16 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT: Mascota al lado del Título Grande + Manifiesto */}
          <div className="lg:col-span-7 space-y-6">
            {/* Logo mascota al lado del texto AGUJA & VINILO SOCIEDAD FUNDADA 2026 */}
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="w-16 h-20 sm:w-20 sm:h-24 shrink-0 flex items-center justify-center">
                <VinylCharacter size={80} inverted={true} />
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-tight uppercase text-white leading-[1.08] whitespace-pre-line drop-shadow-sm font-normal">
                  {t.footer.society}
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans font-light max-w-xl drop-shadow-sm">
              {t.footer.manifesto}
            </p>

            {/* Iconos Sociales: TikTok, Instagram, Gmail, WhatsApp */}
            <div className="flex items-center gap-3.5 text-white pt-1">
              <a
                href="https://www.tiktok.com/@agujayvinilos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok de Aguja & Vinilo"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/30 bg-black/40 flex items-center justify-center hover:border-white transition-colors cursor-pointer backdrop-blur-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.75 1.11-.06 2.16-.67 2.7-1.63.44-.75.56-1.64.55-2.52V0h.06z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/ajuga_y_vinilo/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Aguja & Vinilo"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/30 bg-black/40 flex items-center justify-center hover:border-white transition-colors cursor-pointer backdrop-blur-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="mailto:jivo3534@gmail.com"
                aria-label="Correo electrónico de Aguja & Vinilo"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/30 bg-black/40 flex items-center justify-center hover:border-white transition-colors cursor-pointer backdrop-blur-sm"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </a>
              <a
                href="https://wa.me/59168610314"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp directo de Aguja & Vinilo"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/30 bg-black/40 flex items-center justify-center hover:border-white transition-colors cursor-pointer backdrop-blur-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT: Enlaces de Navegación en 2 columnas amplias */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 sm:gap-12 text-sm font-mono uppercase tracking-wider text-gray-200">
            <ul className="space-y-3.5">
              <li>
                <Link href="/suscripcion" className="group text-neutral-300 hover:text-white transition-colors block">
                  <HoverRollText text={t.nav.subscription} />
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="group text-neutral-300 hover:text-white transition-colors block">
                  <HoverRollText text={t.footer.about} />
                </Link>
              </li>
              <li>
                <Link href="/faq" className="group text-neutral-300 hover:text-white transition-colors block">
                  <HoverRollText text={t.footer.faq} />
                </Link>
              </li>
              <li>
                <Link href="/blog" className="group text-neutral-300 hover:text-white transition-colors block">
                  <HoverRollText text={t.footer.blog} />
                </Link>
              </li>
              <li>
                <Link href="/envios" className="group text-neutral-300 hover:text-white transition-colors block">
                  <HoverRollText text={t.footer.shippingPolicy} />
                </Link>
              </li>
              <li>
                <Link href="/devoluciones" className="group text-neutral-300 hover:text-white transition-colors block">
                  <HoverRollText text={t.footer.returnPolicy} />
                </Link>
              </li>
            </ul>

            <ul className="space-y-3.5">
              <li>
                <Link href="/privacidad" className="group text-neutral-300 hover:text-white transition-colors block">
                  <HoverRollText text={t.footer.privacyPolicy} />
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="group text-neutral-300 hover:text-white transition-colors block">
                  <HoverRollText text={t.footer.terms} />
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="group text-neutral-300 hover:text-white transition-colors block">
                  <HoverRollText text={t.footer.contact} />
                </Link>
              </li>
              <li>
                <Link href="/empresa" className="group text-neutral-300 hover:text-white transition-colors block">
                  <HoverRollText text={t.footer.companyInfo} />
                </Link>
              </li>
              <li>
                <Link href="/mayoristas" className="group text-neutral-300 hover:text-white transition-colors block">
                  <HoverRollText text={t.footer.wholesale} />
                </Link>
              </li>
              <li>
                <Link href="/estado-pedido" className="group text-neutral-300 hover:text-white transition-colors block">
                  <HoverRollText text={t.footer.orderStatus} />
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Fila Inferior: Copyright & Switcher de Idioma */}
        <div className="mt-12 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-gray-300 font-sans gap-4">
          <p>{t.footer.copyright}</p>
          
          <div className="flex items-center gap-5">
            <p className="font-mono text-xs text-gray-300 hidden md:inline">
              {t.footer.motto}
            </p>
            <div className="flex items-center text-xs font-mono tracking-wider text-gray-300 select-none border-l border-white/20 pl-4">
              <button
                type="button"
                onClick={() => setLanguage("es")}
                className={`transition-colors ${language === "es" ? "text-white font-bold underline" : "hover:text-white"}`}
              >
                ES
              </button>
              <span className="mx-1 text-gray-400">/</span>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`transition-colors ${language === "en" ? "text-white font-bold underline" : "hover:text-white"}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
