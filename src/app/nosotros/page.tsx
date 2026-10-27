import React from "react";
import Link from "next/link";
import { Disc, Hammer, Sparkles, Truck } from "lucide-react";

export default function NosotrosPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* HEADER MANIFESTO */}
      <div className="space-y-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89D56]/15 border border-[#C89D56]/30 text-xs font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22]">
          <Disc className="w-3.5 h-3.5" />
          <span>MANIFIESTO DEL OBJETO FÍSICO • TIENDA 100% ONLINE BOLIVIA</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-theme-primary leading-tight font-normal">
          La música no es un archivo comprimido. Es un ritual palpable.
        </h1>

        <p className="text-sm sm:text-base text-theme-secondary font-light leading-relaxed">
          Aguja y Vinilo es una tienda online boliviana nacida de una convicción sencilla:
          en una era de consumo efímero donde las canciones se descartan a los pocos segundos,
          el disco de vinilo es un acto de resistencia afectiva. Obliga a detenerse, contemplar
          el arte de 31 centímetros y escuchar.
        </p>
      </div>

      {/* THREE EDITORIAL PILLARS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 space-y-4 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-[#C89D56]/40 flex items-center justify-center text-[#C89D56]">
            <Disc className="w-5 h-5" />
          </div>
          <h3 className="font-display text-xl text-theme-primary">Prensado sin Compromisos</h3>
          <p className="text-xs text-theme-muted leading-relaxed">
            Solo trabajamos con vinilo virgen de 180 y 200 gramos. Cada copia se examina visual y mecánicamente antes de salir: cero alabeos, cero saltos de aguja.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 space-y-4 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-[#BD5338]/40 flex items-center justify-center text-[#D26445]">
            <Hammer className="w-5 h-5" />
          </div>
          <h3 className="font-display text-xl text-theme-primary">Maderas Nobles & Reciclaje</h3>
          <p className="text-xs text-theme-muted leading-relaxed">
            Nuestros muebles nacen de nogal, cedro y roble bolivianos de fuentes sostenibles. Moldeamos vinilos defectuosos como separadores térmicos para cerrar el ciclo material del formato.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 space-y-4 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-[#5F6B50]/40 flex items-center justify-center text-[#748363]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-display text-xl text-theme-primary">Curaduría Humana</h3>
          <p className="text-xs text-theme-muted leading-relaxed">
            Detrás de cada recomendación y de nuestra suscripción mensual no hay algoritmos de retención, sino personas que han pasado décadas rebuscando en cajas de discos.
          </p>
        </div>
      </div>

      {/* STORY & WORKSHOP SECTION */}
      <section className="p-8 sm:p-12 rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 space-y-6 shadow-sm">
        <h2 className="font-display text-2xl sm:text-3xl text-theme-primary">
          El Taller & Los Despachos Nacionales
        </h2>
        <div className="space-y-4 text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
          <p>
            Desde nuestro taller en Bolivia preparamos y despachamos cada vinilo, tornamesa y mueble
            artesanal con embalajes reforzados contra golpes y esquineros rígidos para garantizar
            que el paquete llegue impecable a cualquier rincón del país.
          </p>
          <p>
            No consideramos que vendemos simples productos; custodiamos una forma de relacionarse
            con el tiempo y con los artistas que concibieron su música para ser escuchada con
            la aguja sobre el acetato.
          </p>
        </div>

        <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22]">
            <Truck className="w-4 h-4" />
            <span>Tienda 100% Online • Envíos a toda Bolivia • WhatsApp: 68610314 • jivo3534@gmail.com</span>
          </div>

          <Link
            href="/contacto"
            className="px-5 py-2.5 rounded-lg bg-[#C89D56] text-[#0E0E0C] font-semibold text-xs hover:bg-[#DDB36D] transition-colors"
          >
            Contactar al Equipo
          </Link>
        </div>
      </section>
    </div>
  );
}
