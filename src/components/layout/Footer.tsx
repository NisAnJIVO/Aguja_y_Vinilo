"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

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
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-12 lg:px-16 pt-12 sm:pt-16 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT: Mascota al lado del Título Grande + Manifiesto */}
          <div className="lg:col-span-7 space-y-6">
            {/* Logo mascota al lado del texto AGUJA & VINILO SOCIEDAD FUNDADA 2026 */}
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="w-16 h-20 sm:w-20 sm:h-24 shrink-0 text-white">
                <svg
                  viewBox="0 0 28 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full text-white drop-shadow-md"
                >
                  <path
                    d="M14 2C7.37 2 2 7.37 2 14C2 19.5 5.5 24.2 10.5 25.5V32C10.5 33.1 9.6 34 8.5 34H7V36H12V26H16V36H21V34H19.5C18.4 34 17.5 33.1 17.5 32V25.5C22.5 24.2 26 19.5 26 14C26 7.37 20.63 2 14 2Z"
                    fill="white"
                  />
                  <ellipse cx="14" cy="13" rx="5.5" ry="3.5" fill="black" />
                  <circle cx="14" cy="13" r="2" fill="white" />
                </svg>
              </div>

              <div>
                <h3 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight uppercase text-white leading-[1.05] whitespace-pre-line drop-shadow-sm">
                  {t.footer.society}
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans max-w-xl drop-shadow-sm">
              {t.footer.manifesto}
            </p>

            {/* Iconos Sociales */}
            <div className="flex items-center gap-3.5 text-white pt-1">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/30 bg-black/40 flex items-center justify-center hover:border-white transition-colors cursor-pointer backdrop-blur-sm">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/30 bg-black/40 flex items-center justify-center hover:border-white transition-colors cursor-pointer backdrop-blur-sm">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/30 bg-black/40 flex items-center justify-center hover:border-white transition-colors cursor-pointer backdrop-blur-sm">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/30 bg-black/40 flex items-center justify-center hover:border-white transition-colors cursor-pointer backdrop-blur-sm">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* RIGHT: Enlaces de Navegación en 2 columnas amplias */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 sm:gap-12 text-sm font-mono uppercase tracking-wider text-gray-200">
            <ul className="space-y-3.5">
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  {t.footer.accountLogin}
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="hover:text-white transition-colors">
                  {t.footer.about}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  {t.footer.faq}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  {t.footer.blog}
                </Link>
              </li>
              <li>
                <Link href="/envios" className="hover:text-white transition-colors">
                  {t.footer.shippingPolicy}
                </Link>
              </li>
              <li>
                <Link href="/devoluciones" className="hover:text-white transition-colors">
                  {t.footer.returnPolicy}
                </Link>
              </li>
            </ul>

            <ul className="space-y-3.5">
              <li>
                <Link href="/privacidad" className="hover:text-white transition-colors">
                  {t.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-white transition-colors">
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition-colors">
                  {t.footer.contact}
                </Link>
              </li>
              <li>
                <Link href="/empresa" className="hover:text-white transition-colors">
                  {t.footer.companyInfo}
                </Link>
              </li>
              <li>
                <Link href="/mayoristas" className="hover:text-white transition-colors">
                  {t.footer.wholesale}
                </Link>
              </li>
              <li>
                <Link href="/estado-pedido" className="hover:text-white transition-colors">
                  {t.footer.orderStatus}
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
