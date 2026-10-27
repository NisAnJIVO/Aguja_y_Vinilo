import React from "react";
import Link from "next/link";
import { RecordsRepository } from "@/data/repositories/recordsRepository";
import { CuratedRepository } from "@/data/repositories/curatedRepository";
import { ProductsRepository } from "@/data/repositories/productsRepository";
import { VinylHero3D } from "@/features/hero3d/VinylHero3D";
import { VinylDiscCover } from "@/components/ui/VinylDiscCover";
import { ArrowRight, Disc, Sparkles, PackageCheck } from "lucide-react";

export default async function HomePage() {
  const featuredRecords = await RecordsRepository.getFeatured();
  const curatedLibraries = await CuratedRepository.getAll();
  const turntables = await ProductsRepository.getTurntables();
  const furniture = await ProductsRepository.getFurniture();

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* 1. HERO SECTION WITH 3D TURNTABLE */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Pure Minimalist Typography */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 dark:bg-white/5 light:bg-black/5 border border-black/10 dark:border-white/10 text-xs font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22]">
              <span className="w-2 h-2 rounded-full bg-[#C89D56]" />
              <span>TIENDA 100% ONLINE • ENVÍOS A TODA BOLIVIA</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-normal leading-[1.08] text-theme-primary">
              El peso del objeto físico. La música en su verdad sonora.
            </h1>

            <p className="text-sm sm:text-base text-theme-secondary leading-relaxed max-w-lg font-light">
              Vinilos de 180 gramos organizados por estados de ánimo, tornamesas de alta fidelidad,
              muebles de autor forjados con vinilos reciclados y nuestra suscripción mensual con
              curaduría especializada. Precios en Bolivianos (Bs) con envíos asegurados a los 9 departamentos.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/catalogo"
                className="px-6 py-3.5 rounded-lg bg-[#C89D56] hover:bg-[#DDB36D] text-[#0E0E0C] font-semibold text-sm transition-all transform hover:-translate-y-0.5 shadow-xl flex items-center gap-2"
              >
                <span>Hojear el Catálogo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/suscripcion"
                className="px-6 py-3.5 rounded-lg bg-theme-card border border-black/10 dark:border-white/10 text-theme-primary text-sm font-medium transition-all flex items-center gap-2 group hover:border-[#C89D56]"
              >
                <Sparkles className="w-4 h-4 text-[#C05436]" />
                <span>Suscripción Sorpresa</span>
              </Link>
            </div>

            {/* Quick credentials */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-black/10 dark:border-white/10 text-xs text-theme-muted font-mono">
              <div>
                <span className="block text-base font-bold text-theme-primary">180g</span>
                <span>Prensado virgen</span>
              </div>
              <div>
                <span className="block text-base font-bold text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22]">En Bs</span>
                <span>Moneda nacional</span>
              </div>
              <div>
                <span className="block text-base font-bold text-theme-primary">0% Saltos</span>
                <span>Garantía de aguja</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Turntable */}
          <div className="lg:col-span-6">
            <VinylHero3D />
          </div>
        </div>
      </section>

      {/* 2. BIBLIOTECAS CURADAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22]">
              Lógica de Playlists, Materia de Vinilo
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-theme-primary">
              Bibliotecas Curadas
            </h2>
            <p className="text-sm text-theme-muted max-w-md">
              Colecciones temáticas armadas a mano por nuestros archiveros para momentos de vida específicos.
            </p>
          </div>
          <Link
            href="/bibliotecas"
            className="text-xs font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] hover:underline flex items-center gap-1.5"
          >
            <span>Ver todas las bibliotecas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {curatedLibraries.slice(0, 3).map((lib) => (
            <Link
              key={lib.id}
              href={`/bibliotecas/${lib.slug}`}
              className="group p-6 rounded-xl border border-black/10 dark:border-white/10 hover:border-[#C89D56]/50 bg-theme-card transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between min-h-[260px] shadow-sm hover:shadow-md"
            >
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] font-semibold">{lib.mood}</span>
                  <span className="text-theme-muted">{lib.recordCount} discos físicos</span>
                </div>
                <h3 className="font-display font-medium text-xl text-theme-primary group-hover:text-[#C89D56] transition-colors leading-snug">
                  {lib.title}
                </h3>
                <p className="text-xs text-theme-muted line-clamp-3 leading-relaxed">
                  {lib.subtitle}
                </p>
              </div>

              <div className="relative z-10 pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-mono text-theme-muted">
                <span>{lib.genreFocus}</span>
                <span className="text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explorar caja <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. CATÁLOGO DESTACADO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#BD5338]">
              Selección de Prensados
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-theme-primary">
              En la Bandeja de Escucha
            </h2>
            <p className="text-sm text-theme-muted max-w-lg">
              Pasa el cursor sobre cualquier portada para asomar el disco o haz clic en el botón de reproducción para escuchar su muestra analógica.
            </p>
          </div>
          <Link
            href="/catalogo"
            className="px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:border-[#C89D56] text-xs font-mono text-theme-primary hover:text-[#C89D56] transition-colors inline-flex items-center gap-2"
          >
            <span>Ver los 24 discos del catálogo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10">
          {featuredRecords.slice(0, 4).map((record) => (
            <div key={record.id} className="flex flex-col space-y-4">
              <Link href={`/catalogo/${record.slug}`} className="flex justify-center">
                <VinylDiscCover record={record} size="md" showSlideOutOnHover />
              </Link>

              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] truncate max-w-[140px]">{record.genre}</span>
                  <span className="text-theme-muted">{record.year}</span>
                </div>
                <Link
                  href={`/catalogo/${record.slug}`}
                  className="block font-display font-semibold text-base text-theme-primary hover:text-[#C89D56] transition-colors line-clamp-1"
                >
                  {record.title}
                </Link>
                <p className="text-xs text-theme-muted line-clamp-1">{record.artist}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-mono font-bold text-sm text-theme-primary">
                    {record.priceBs} Bs
                  </span>
                  <span className="text-[10px] font-mono text-theme-muted uppercase bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded border border-black/5 dark:border-white/5">
                    {record.weight}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SUSCRIPCIÓN MENSUAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-[#161513] dark:bg-[#161513] light:bg-[#EAE4D5] border border-black/10 dark:border-white/10 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C05436]/15 border border-[#C05436]/30 text-xs font-mono text-[#C05436]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EXPERIENCIA EXCLUSIVA • 3 DISCOS AL MES</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#F6F3EC] dark:text-[#F6F3EC] light:text-[#12110E] leading-tight">
                Suscripción Sorpresa: 3 discos al mes a la puerta de tu casa.
              </h2>

              <p className="text-sm sm:text-base text-[#C3B9A1] dark:text-[#C3B9A1] light:text-[#38342B] leading-relaxed max-w-xl font-light">
                Un servicio para personas con oídos curiosos. Configuramos tu perfil de gustos (géneros,
                décadas y discos que ya tienes) para enviarte 3 discos que no conoces pero amarás. Cada
                entrega llega con funda de serigrafía numerada propia y notas manuscritas del curador.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/suscripcion"
                  className="px-6 py-3.5 rounded-lg bg-[#C89D56] hover:bg-[#DDB36D] text-[#0E0E0C] font-semibold text-sm transition-all transform hover:scale-105 shadow-xl flex items-center gap-2"
                >
                  <span>Iniciar Onboarding de Gustos</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="text-xs font-mono text-[#8B826B] dark:text-[#8B826B] light:text-[#666050] flex items-center gap-2">
                  <PackageCheck className="w-4 h-4 text-[#C89D56]" />
                  <span>490 Bs / mes • Envío incluido a toda Bolivia</span>
                </div>
              </div>
            </div>

            {/* Visual Box Simulation */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm p-6 rounded-xl bg-[#1C1A17] dark:bg-[#1C1A17] light:bg-[#F5EFE3] border border-black/10 dark:border-white/10 shadow-lg space-y-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#C89D56] border-b border-black/10 dark:border-white/10 pb-3">
                  <span>CAJA DEL MES • NOVIEMBRE</span>
                  <span>NO. 042 / 300</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded bg-black/10 dark:bg-black/20 flex items-center justify-between text-xs">
                    <div>
                      <strong className="block text-theme-primary">Semana 1</strong>
                      <span className="text-theme-muted text-[11px]">Raíz & Fusión Clásica</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#C89D56]">Lacre Dorado</span>
                  </div>

                  <div className="p-3 rounded bg-black/10 dark:bg-black/20 flex items-center justify-between text-xs">
                    <div>
                      <strong className="block text-theme-primary">Semana 2</strong>
                      <span className="text-theme-muted text-[11px]">Vanguardia & Textura</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#C05436]">Terracota</span>
                  </div>

                  <div className="p-3 rounded bg-black/10 dark:bg-black/20 flex items-center justify-between text-xs">
                    <div>
                      <strong className="block text-theme-primary">Semana 3</strong>
                      <span className="text-theme-muted text-[11px]">La Gran Revelación</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#5F6B50]">Musgo</span>
                  </div>
                </div>

                <p className="text-[10px] text-center text-theme-muted font-mono pt-2">
                  Desprecintado interactivo semanal en el onboarding
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TOCADISCOS Y MUEBLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Card: Tocadiscos */}
          <div className="p-8 sm:p-10 rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22]">
                Precisión Electromecánica
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-theme-primary">
                Tocadiscos Calibrados
              </h3>
              <p className="text-sm text-theme-muted leading-relaxed">
                Tornamesas manuales con brazo de carbono, plintos de maderas bolivianas desacopladas y
                cápsulas Ortofon o Nagaoka afinadas en nuestro banco de pruebas antes de entregártelas.
              </p>
            </div>

            <div className="space-y-3">
              {turntables.slice(0, 2).map((t) => (
                <div key={t.id} className="p-4 rounded-lg bg-black/5 dark:bg-white/5 flex justify-between items-center text-xs border border-black/5 dark:border-white/5">
                  <div>
                    <h4 className="font-display font-medium text-sm text-theme-primary">{t.name}</h4>
                    <p className="text-theme-muted text-[11px]">{t.cartridge}</p>
                  </div>
                  <span className="font-mono font-bold text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22]">{t.priceBs} Bs</span>
                </div>
              ))}
            </div>

            <Link
              href="/tocadiscos"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] hover:underline"
            >
              <span>Ver todos los tocadiscos y especificaciones</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card: Muebles */}
          <div className="p-8 sm:p-10 rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#BD5338]">
                Carpintería & Discos Reciclados
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-theme-primary">
                Mobiliario Hecho con Vinilos
              </h3>
              <p className="text-sm text-theme-muted leading-relaxed">
                Aparadores y exhibidores fabricados a mano en nogal, cedro y roble con separadores
                verticales moldeados a partir de vinilos reciclados al calor. Diseñados para cuidar tus cubiertas.
              </p>
            </div>

            <div className="space-y-3">
              {furniture.slice(0, 2).map((f) => (
                <div key={f.id} className="p-4 rounded-lg bg-black/5 dark:bg-white/5 flex justify-between items-center text-xs border border-black/5 dark:border-white/5">
                  <div>
                    <h4 className="font-display font-medium text-sm text-theme-primary">{f.name}</h4>
                    <p className="text-theme-muted text-[11px]">{f.capacity}</p>
                  </div>
                  <span className="font-mono font-bold text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22]">{f.priceBs} Bs</span>
                </div>
              ))}
            </div>

            <Link
              href="/muebles"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] hover:underline"
            >
              <span>Ver catálogo de mobiliario artesanal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. MANIFIESTO */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <Disc className="w-10 h-10 text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] mx-auto animate-spin-slow opacity-80" />
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-theme-primary leading-snug">
          &ldquo;Un disco de vinilo te exige estar presente. No se salta una pista con el dedo. Te sientas, escuchas los 22 minutos de la cara A y permites que la música respire.&rdquo;
        </h2>
        <p className="text-xs font-mono uppercase tracking-widest text-theme-muted">
          — Aguja y Vinilo • Tienda Online con Envíos a toda Bolivia
        </p>
      </section>
    </div>
  );
}
