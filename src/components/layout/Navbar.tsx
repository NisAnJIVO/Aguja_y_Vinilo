"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Search, X, Menu, PackageCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCartStore } from "@/store/cartStore";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { useProductModalStore } from "@/store/productModalStore";
import { useSearchStore } from "@/store/searchStore";
import { VinylCharacter } from "@/components/ui/VinylCharacter";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HoverRollText } from "@/components/ui/HoverRollText";
import { DISCOS_CATALOG } from "@/data/discosData";
import { MOCK_TURNTABLES } from "@/data/mock-hardware";
import { MOCK_FURNITURE } from "@/data/mock-furniture";
import { MOCK_SLEEVES } from "@/data/mock-sleeves";

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchExpanded, setIsMobileSearchExpanded] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { getTotalItems } = useCartStore();
  const { isPlus } = useSubscriptionStore();
  const { openModal } = useProductModalStore();
  const { searchQuery, setSearchQuery, clearSearch } = useSearchStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Bloqueo de scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Es una página de catálogo con filtrado nativo en vivo
  const isLiveFilterPage =
    pathname === "/discos" ||
    pathname === "/tocadiscos" ||
    pathname === "/racks" ||
    pathname === "/extras";

  // Al cambiar de ruta o navegar, se limpia automáticamente el buscador y se cierra el menú móvil
  useEffect(() => {
    setSearchTerm("");
    clearSearch();
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileSearchExpanded(false);
  }, [pathname, clearSearch]);

  // Si cambia el store externo (ej: botón "Limpiar filtro" en la página), sincronizar input
  useEffect(() => {
    if (searchQuery === "" && searchTerm !== "") {
      setSearchTerm("");
    }
  }, [searchQuery, searchTerm]);

  // Cerrar dropdown y colapsar buscador al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
        if (isMobileSearchExpanded && !searchTerm.trim()) {
          setIsMobileSearchExpanded(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileSearchExpanded, searchTerm]);

  const totalItems = mounted ? getTotalItems() : 0;

  // Búsqueda en vivo cruzada para páginas secundarias
  const searchResults = useMemo(() => {
    if (isLiveFilterPage) return [];
    const q = searchTerm.trim().toLowerCase();
    if (q.length < 2) return [];

    const results: Array<{
      id: string | number;
      type: "vinyl" | "turntable" | "furniture" | "sleeve";
      title: string;
      subtitle: string;
      priceBs: number;
      image: string;
      description: string;
      href?: string;
    }> = [];

    // 1. Discos
    for (const disco of DISCOS_CATALOG) {
      if (
        disco.title.toLowerCase().includes(q) ||
        disco.artist.toLowerCase().includes(q) ||
        disco.song?.toLowerCase().includes(q) ||
        disco.format?.toLowerCase().includes(q)
      ) {
        results.push({
          id: disco.id,
          type: "vinyl",
          title: disco.title,
          subtitle: `${disco.artist} • ${disco.format || "Vinilo 180g"}`,
          priceBs: disco.priceBs,
          image: disco.coverImage,
          description: `Álbum de ${disco.artist}. Edición en vinilo virgen nuevo y sellado.`,
        });
      }
      if (results.length >= 8) break;
    }

    // 2. Tocadiscos
    if (results.length < 8) {
      for (const tt of MOCK_TURNTABLES) {
        if (
          tt.name.toLowerCase().includes(q) ||
          tt.brand.toLowerCase().includes(q) ||
          tt.description.toLowerCase().includes(q)
        ) {
          results.push({
            id: tt.id,
            type: "turntable",
            title: tt.name,
            subtitle: `${tt.brand} • Tornamesa`,
            priceBs: tt.priceBs,
            image: tt.image,
            description: tt.description,
          });
        }
        if (results.length >= 8) break;
      }
    }

    // 3. Muebles
    if (results.length < 8) {
      for (const furn of MOCK_FURNITURE) {
        if (
          furn.name.toLowerCase().includes(q) ||
          furn.wood.toLowerCase().includes(q) ||
          furn.description.toLowerCase().includes(q)
        ) {
          results.push({
            id: furn.id,
            type: "furniture",
            title: furn.name,
            subtitle: `${furn.capacity} • Mueble`,
            priceBs: furn.priceBs,
            image: furn.image,
            description: furn.description,
          });
        }
        if (results.length >= 8) break;
      }
    }

    // 4. Extras
    if (results.length < 8) {
      for (const slv of MOCK_SLEEVES) {
        if (
          slv.name.toLowerCase().includes(q) ||
          slv.category.toLowerCase().includes(q) ||
          slv.description.toLowerCase().includes(q)
        ) {
          results.push({
            id: slv.id,
            type: "sleeve",
            title: slv.name,
            subtitle: `${slv.category} • Accesorios`,
            priceBs: slv.priceBs,
            image: slv.image,
            description: slv.description,
          });
        }
        if (results.length >= 8) break;
      }
    }

    return results;
  }, [searchTerm, isLiveFilterPage]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchTerm.trim()) return;

    if (isLiveFilterPage) {
      // Ya está filtrando en tiempo real en la página
      return;
    }

    setIsSearchOpen(false);
    setIsMobileSearchExpanded(false);
    router.push(`/discos?q=${encodeURIComponent(searchTerm.trim())}`);
  };

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
      <div className="w-full px-4 sm:px-8 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* LADO IZQUIERDO: HAMBURGUESA MÓVIL + LOGO */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 -ml-1 text-black hover:bg-neutral-100 rounded focus:outline-none cursor-pointer"
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 stroke-[2]" />
            ) : (
              <Menu className="w-5 h-5 stroke-[2]" />
            )}
          </button>

          {/* LOGO */}
          <Link
            href="/"
            onClick={() => {
              setSearchTerm("");
              clearSearch();
              setIsSearchOpen(false);
              setIsMobileMenuOpen(false);
              setIsMobileSearchExpanded(false);
            }}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0"
            aria-label="Aguja & Vinilo"
          >
            <div className="w-7 h-9 sm:w-8 sm:h-10 flex items-center justify-center shrink-0">
              <VinylCharacter size={32} />
            </div>

            {/* Texto AGUJA & VINILO y PLUS: se ocultan en móvil si se expande la búsqueda */}
            <div className={`items-center gap-1.5 sm:gap-2 ${isMobileSearchExpanded ? "hidden sm:flex" : "flex"}`}>
              <span
                style={{ fontFamily: "'IBM Plex Sans', sans-serif", letterSpacing: "-0.8px" }}
                className="font-bold text-sm sm:text-lg tracking-tight uppercase text-black whitespace-nowrap"
              >
                AGUJA &amp; VINILO
              </span>
              {mounted && isPlus && (
                <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold bg-[#F59E0B] text-black tracking-wider uppercase shadow-xs shrink-0 animate-in zoom-in-75">
                  PLUS
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* NAVEGACIÓN DESKTOP */}
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
                  setSearchTerm("");
                  clearSearch();
                  setIsSearchOpen(false);
                  window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
                }}
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  letterSpacing: "-0.8px",
                }}
                className="relative py-1 uppercase text-[15px] font-medium text-black group select-none"
              >
                <ScrambleText text={item.label} />
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

        {/* UTILIDADES DERECHA */}
        <div className={`flex items-center gap-2.5 sm:gap-6 ${isMobileSearchExpanded ? "flex-1 justify-end ml-2" : "shrink-0"}`}>
          
          {/* SWITCHER DE IDIOMA (ES / EN): En móvil se oculta solo cuando la búsqueda está expandida */}
          <div
            style={{ fontFamily: "'IBM Plex Sans', sans-serif", letterSpacing: "-0.5px" }}
            className={`items-center text-xs tracking-wider text-gray-400 select-none shrink-0 ${
              isMobileSearchExpanded ? "hidden sm:flex" : "flex"
            }`}
          >
            <button
              type="button"
              onClick={() => setLanguage("es")}
              className={`transition-colors py-0.5 px-1 cursor-pointer ${
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
              className={`transition-colors py-0.5 px-1 cursor-pointer ${
                language === "en"
                  ? "text-black font-bold"
                  : "hover:text-black"
              }`}
              title="Switch to English"
            >
              EN
            </button>
          </div>

          {/* BUSCADOR INTERACTIVO EN VIVO */}
          <div ref={searchContainerRef} className={`relative ${isMobileSearchExpanded ? "flex-1 max-w-full" : ""}`}>
            
            {/* Botón lupita compacto para móvil (cuando está cerrado) */}
            {!isMobileSearchExpanded && (
              <button
                type="button"
                onClick={() => {
                  setIsMobileSearchExpanded(true);
                  setTimeout(() => {
                    searchInputRef.current?.focus();
                  }, 60);
                }}
                className="sm:hidden p-1.5 text-black hover:opacity-70 focus:outline-none cursor-pointer flex items-center justify-center shrink-0"
                aria-label="Abrir buscador"
              >
                <Search className="w-4 h-4 stroke-[2.2]" />
              </button>
            )}

            {/* Formulario de búsqueda (expandido en móvil, o visible siempre en desktop) */}
            <form
              onSubmit={handleSearchSubmit}
              className={`items-center gap-1.5 border-b border-black pb-0.5 transition-all ${
                isMobileSearchExpanded
                  ? "flex w-full"
                  : "hidden sm:flex w-32 md:w-44 focus-within:w-44 md:focus-within:w-56"
              }`}
            >
              <button
                type="submit"
                className="text-black hover:opacity-70 focus:outline-none cursor-pointer shrink-0"
                aria-label="Buscar"
              >
                <Search className="w-3.5 h-3.5 stroke-[2.2]" />
              </button>
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchTerm(val);
                  setSearchQuery(val);
                  if (!isLiveFilterPage && val.trim().length >= 2) {
                    setIsSearchOpen(true);
                  } else {
                    setIsSearchOpen(false);
                  }
                }}
                onFocus={() => {
                  if (!isLiveFilterPage && searchTerm.trim().length >= 2) {
                    setIsSearchOpen(true);
                  }
                }}
                placeholder={t.nav.searchPlaceholder}
                style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                className="w-full bg-transparent text-xs text-black focus:outline-none placeholder:text-neutral-400 font-sans"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    clearSearch();
                    setIsSearchOpen(false);
                  }}
                  className="text-neutral-400 hover:text-black focus:outline-none cursor-pointer p-0.5 shrink-0"
                  title="Limpiar búsqueda"
                >
                  <X className="w-3 h-3" />
                </button>
              )}

              {/* Botón cerrar para colapsar el buscador en móvil */}
              {isMobileSearchExpanded && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileSearchExpanded(false);
                    setSearchTerm("");
                    clearSearch();
                    setIsSearchOpen(false);
                  }}
                  className="sm:hidden text-neutral-500 hover:text-black p-1 ml-0.5 shrink-0 cursor-pointer"
                  title="Cerrar buscador"
                  aria-label="Cerrar buscador"
                >
                  <X className="w-4 h-4 stroke-[2]" />
                </button>
              )}
            </form>

            {/* PANEL DE RESULTADOS DESPLEGABLE EN VIVO (Solo en páginas que NO sean catálogos) */}
            {!isLiveFilterPage && isSearchOpen && searchTerm.trim().length >= 2 && (
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-96 bg-white border border-black/15 shadow-xl rounded-sm z-[100] max-h-[70vh] overflow-y-auto animate-in fade-in duration-150">
                <div className="p-2 border-b border-neutral-100 flex items-center justify-between font-mono text-[11px] text-neutral-500 uppercase">
                  <span>Resultados para &ldquo;{searchTerm}&rdquo;</span>
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="text-black underline font-bold hover:opacity-75 cursor-pointer"
                  >
                    Ver en catálogo &rarr;
                  </button>
                </div>

                {searchResults.length === 0 ? (
                  <div className="p-6 text-center text-xs font-mono text-neutral-500">
                    No se encontraron coincidencias para &ldquo;{searchTerm}&rdquo;.
                  </div>
                ) : (
                  <div className="divide-y divide-neutral-100">
                    {searchResults.map((res) => (
                      <div
                        key={`${res.type}-${res.id}`}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setIsMobileSearchExpanded(false);
                          setSearchTerm("");
                          clearSearch();
                          openModal({
                            id: String(res.id),
                            title: res.title,
                            subtitle: res.subtitle,
                            priceBs: res.priceBs,
                            image: res.image,
                            description: res.description,
                            type: res.type,
                          });
                        }}
                        className="p-2.5 flex items-center gap-3 hover:bg-neutral-50 cursor-pointer transition-colors"
                      >
                        <div className="w-11 h-11 bg-neutral-100 shrink-0 border border-black/5 overflow-hidden rounded-xs flex items-center justify-center">
                          <img
                            src={res.image}
                            alt={res.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-serif text-black truncate leading-tight">
                            {res.title}
                          </h4>
                          <span className="text-[10px] font-mono text-neutral-500 block truncate">
                            {res.subtitle}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-neutral-900 block mt-0.5">
                            Bs. {res.priceBs.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* BOTÓN CARRITO CON EFECTO MAGNÉTICO GSAP */}
          <MagneticButton>
            <Link
              href="/carrito"
              onClick={() => {
                setSearchTerm("");
                clearSearch();
                setIsSearchOpen(false);
                setIsMobileSearchExpanded(false);
              }}
              aria-label="Ver Carrito de Compras"
              className="flex items-center gap-2 select-none group text-black focus:outline-none shrink-0 px-2 py-1"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 stroke-[1.8] group-hover:scale-105 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-black text-white text-[10px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <span
                style={{ fontFamily: "'IBM Plex Sans', sans-serif", letterSpacing: "-0.5px" }}
                className="text-xs font-bold uppercase tracking-wider hidden sm:inline"
              >
                <ScrambleText text={t.nav.cart} />
              </span>
            </Link>
          </MagneticButton>

        </div>
      </div>

      {/* MENÚ MÓVIL OVERLAY DESPLEGABLE */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[68px] z-50 lg:hidden bg-white/98 backdrop-blur-md flex flex-col justify-between p-6 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-6">
            <div className="border-b border-black/10 pb-3 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                Navegación • Catálogo
              </span>
              <span className="font-mono text-xs text-neutral-500">
                Bolivia 100%
              </span>
            </div>

            <nav className="flex flex-col space-y-3">
              {navLinks.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setSearchTerm("");
                      clearSearch();
                      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                    }}
                    className={`font-serif text-2xl font-normal py-1 border-b border-neutral-100 flex items-center justify-between transition-colors ${
                      isActive ? "text-black font-semibold" : "text-neutral-700 hover:text-black"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs text-neutral-400">&rarr;</span>
                  </Link>
                );
              })}

              <Link
                href="/estado-pedido"
                onClick={() => setIsMobileMenuOpen(false)}
                className="group font-serif text-xl font-normal py-1 text-neutral-700 hover:text-black border-b border-neutral-100 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <PackageCheck className="w-4 h-4 text-neutral-500" />
                  <HoverRollText
                    text={language === "en" ? "Track Order" : "Rastrear Pedido"}
                    rollClassName="italic text-black font-medium"
                  />
                </span>
                <span className="font-mono text-xs text-neutral-400">&rarr;</span>
              </Link>

              <Link
                href="/nosotros"
                onClick={() => setIsMobileMenuOpen(false)}
                className="group font-serif text-xl font-normal py-1 text-neutral-700 hover:text-black border-b border-neutral-100 flex items-center justify-between"
              >
                <HoverRollText
                  text={language === "en" ? "About Us" : "Sobre Nosotros"}
                  rollClassName="italic text-black font-medium"
                />
                <span className="font-mono text-xs text-neutral-400">&rarr;</span>
              </Link>
            </nav>
          </div>

          {/* Pie del menú móvil: Idioma y Redes */}
          <div className="pt-6 border-t border-neutral-200 mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-500">
                Idioma / Language:
              </span>
              <div className="flex items-center gap-2 font-mono text-sm">
                <button
                  type="button"
                  onClick={() => setLanguage("es")}
                  className={`px-3 py-1 border text-xs ${
                    language === "es"
                      ? "bg-black text-white border-black font-bold"
                      : "bg-white text-neutral-700 border-neutral-300"
                  }`}
                >
                  ES
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 border text-xs ${
                    language === "en"
                      ? "bg-black text-white border-black font-bold"
                      : "bg-white text-neutral-700 border-neutral-300"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-600 pt-2">
              <a
                href="https://www.tiktok.com/@agujayvinilos"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                TikTok
              </a>
              <span>•</span>
              <a
                href="https://www.instagram.com/ajuga_y_vinilo/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Instagram
              </a>
              <span>•</span>
              <a
                href="mailto:jivo3534@gmail.com"
                className="hover:underline"
              >
                Gmail
              </a>
              <span>•</span>
              <a
                href="https://wa.me/59168610314"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
