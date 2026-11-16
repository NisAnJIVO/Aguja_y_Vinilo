"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/discos", label: t.nav.records },
    { href: "/tocadiscos", label: t.nav.turntables },
    { href: "/racks", label: t.nav.racks },
    { href: "/extras", label: t.nav.extras },
    { href: "/suscripcion", label: t.nav.subscription },
  ];

  return (
    <header className="sticky top-0 z-50 w-full h-[68px] bg-white border-b border-[#EEEEEE] flex items-center">
      <div className="w-full px-4 sm:px-8 flex items-center justify-between gap-6">
        
        {/* LOGO: Mutant-inspired Quirky Brutalist Character + Bold Brand Name */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none shrink-0"
          aria-label="Aguja & Vinilo"
        >
          {/* Custom Mutant-style little Vinyl Cyclops Character */}
          <div className="w-7 h-9 flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 28 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-black transition-transform duration-300 group-hover:scale-105"
            >
              <path
                d="M14 2C7.37 2 2 7.37 2 14C2 19.5 5.5 24.2 10.5 25.5V32C10.5 33.1 9.6 34 8.5 34H7V36H12V26H16V36H21V34H19.5C18.4 34 17.5 33.1 17.5 32V25.5C22.5 24.2 26 19.5 26 14C26 7.37 20.63 2 14 2Z"
                fill="currentColor"
              />
              <ellipse cx="14" cy="13" rx="5.5" ry="3.5" fill="white" />
              <circle cx="14" cy="13" r="2" fill="black" />
            </svg>
          </div>

          <span
            style={{ fontFamily: "'IBM Plex Sans', sans-serif", letterSpacing: "-0.8px" }}
            className="font-bold text-lg tracking-tight uppercase text-black"
          >
            AGUJA &amp; VINILO
          </span>
        </Link>

        {/* DESKTOP NAVIGATION: Exact 5 categories requested (Discos, Tocadiscos, Racks, Extras, Suscripción) */}
        <nav suppressHydrationWarning className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
                }}
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  letterSpacing: "-0.8px",
                }}
                className="relative py-1 uppercase text-[15px] font-medium text-black group select-none"
              >
                <span>{item.label}</span>
                {/* Subrayado animado que nace desde la derecha hacia la izquierda */}
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 right-0 h-[2px] bg-black transition-all duration-300 ease-out pointer-events-none ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* RIGHT UTILITIES: Minimalist Language Selector + Search Icon with underline + Cart */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* DISCREET MINIMALIST LANGUAGE SWITCHER (ES / EN) */}
          <div
            style={{ fontFamily: "'IBM Plex Sans', sans-serif", letterSpacing: "-0.5px" }}
            className="flex items-center text-xs tracking-wider text-gray-400 select-none"
          >
            <button
              type="button"
              onClick={() => setLanguage("es")}
              className={`transition-colors py-0.5 px-1 ${
                language === "es"
                  ? "text-black font-bold"
                  : "hover:text-black"
              }`}
              title="Cambiar a Español"
            >
              ES
            </button>
            <span className="text-gray-300">/</span>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`transition-colors py-0.5 px-1 ${
                language === "en"
                  ? "text-black font-bold"
                  : "hover:text-black"
              }`}
              title="Switch to English"
            >
              EN
            </button>
          </div>

          {/* Icono de Lupa + Línea de Búsqueda subrayada pura */}
          <div className="flex items-center gap-1.5 border-b border-black pb-0.5 w-24 sm:w-36">
            <Search className="w-3.5 h-3.5 text-black stroke-[2.2] shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
              className="w-full bg-transparent text-xs text-black focus:outline-none"
            />
          </div>

          {/* Cart with count */}
          <Link
            href="/checkout"
            style={{ fontFamily: "'IBM Plex Sans', sans-serif", letterSpacing: "-0.8px" }}
            className="flex items-center gap-1.5 uppercase text-[15px] font-medium text-black hover:opacity-60 transition-opacity"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2]" />
            <span className="hidden sm:inline">{t.nav.cart}</span>
            <span className="text-xs">(0)</span>
          </Link>
        </div>

      </div>
    </header>
  );
};
