"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { usePlayerStore } from "@/store/playerStore";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ShoppingBag, Disc, Menu, X, Sparkles, MessageCircle } from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { getTotalItems, openCart } = useCartStore();
  const { isPlaying, currentRecord, togglePlay } = usePlayerStore();
  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/catalogo", label: "Catálogo" },
    { href: "/bibliotecas", label: "Bibliotecas" },
    { href: "/tocadiscos", label: "Tocadiscos" },
    { href: "/fundas", label: "Fundas & Cuidados" },
    { href: "/muebles", label: "Muebles" },
    { href: "/suscripcion", label: "Suscripción Sorpresa", highlight: true },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0E0E0C]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl"
            : "bg-[#0E0E0C]/80 backdrop-blur-sm py-4 border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* BRAND LOGO */}
            <Link
              href="/"
              className="group flex items-center gap-3 focus:outline-none"
              aria-label="Aguja y Vinilo — Inicio"
            >
              <div className="w-8 h-8 rounded-full bg-[#181714] border border-[#C89D56]/40 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                <Disc className="w-4 h-4 text-[#C89D56]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-semibold tracking-wider text-base text-[#F6F3EC] group-hover:text-[#C89D56] transition-colors">
                  AGUJA Y VINILO
                </span>
                <span className="text-[9px] font-mono tracking-widest text-[#8B826B] uppercase">
                  Tienda Online • Envíos a toda Bolivia
                </span>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      link.highlight
                        ? "bg-[#C05436]/15 text-[#D26445] hover:bg-[#C05436]/25 border border-[#C05436]/30 flex items-center gap-1.5"
                        : isActive
                        ? "text-[#C89D56] font-semibold bg-white/10"
                        : "text-[#C3B9A1] hover:text-[#F6F3EC] hover:bg-white/[0.04]"
                    }`}
                  >
                    {link.highlight && <Sparkles className="w-3 h-3 text-[#D26445]" />}
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT UTILITIES */}
            <div className="flex items-center gap-3">
              {/* WhatsApp Quick Chat */}
              <a
                href="https://wa.me/59168610314?text=Hola%20Aguja%20y%20Vinilo,%20quisiera%20consultar%20sobre%20un%20disco"
                target="_blank"
                rel="noopener noreferrer"
                title="Escríbenos por WhatsApp (68610314)"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181714] border border-white/10 text-xs font-mono text-[#F6F3EC] hover:text-[#5F6B50] hover:border-[#5F6B50] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#5F6B50]" />
                <span className="text-[11px]">68610314</span>
              </a>

              {/* Active Sound / Needle Indicator (NO blinking ping) */}
              {currentRecord && (
                <button
                  onClick={togglePlay}
                  className="hidden sm:flex items-center gap-2 bg-[#181714] border border-[#C89D56]/30 px-2.5 py-1 rounded-full text-xs text-[#C89D56] hover:border-[#C89D56] transition-colors"
                  title="Control de reproducción"
                >
                  <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-[#C89D56]" : "bg-[#8B826B]"}`} />
                  <span className="font-mono text-[11px] truncate max-w-[110px]">
                    {currentRecord.title}
                  </span>
                </button>
              )}

              {/* THEME TOGGLE */}
              <ThemeToggle />

              {/* CART DRAWER BUTTON */}
              <button
                onClick={openCart}
                aria-label="Abrir carrito de compras"
                className="relative p-2 rounded-full text-[#F6F3EC] hover:text-[#C89D56] hover:bg-white/5 transition-colors focus:outline-none"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#C89D56] text-[#0E0E0C] text-[10px] font-bold font-mono w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* MOBILE MENU TOGGLE */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                className="lg:hidden p-2 text-[#F6F3EC] hover:text-[#C89D56]"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE FULLSCREEN MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#0E0E0C]/98 backdrop-blur-xl lg:hidden flex flex-col pt-24 px-6 pb-8 overflow-y-auto">
          <nav className="flex flex-col gap-4 text-center my-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xl font-display py-2 transition-colors ${
                  pathname === link.href ? "text-[#C89D56] font-semibold" : "text-[#F6F3EC] hover:text-[#C89D56]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-white/10 pt-6 text-center text-xs text-[#8B826B] font-mono space-y-2">
            <p className="font-semibold text-[#F6F3EC]">
              Aguja y Vinilo • Tienda 100% Online
            </p>
            <p>WhatsApp: 68610314 • jivo3534@gmail.com</p>
            <p className="text-[11px] text-[#C89D56]">Envíos protegidos a toda Bolivia • Moneda: Bolivianos (Bs)</p>
          </div>
        </div>
      )}
    </>
  );
};
