"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MOCK_TURNTABLES } from "@/data/mock-hardware";
import { Turntable } from "@/data/types";
import { useCartStore } from "@/store/cartStore";
import { ShieldCheck, Check, ShoppingBag, Cpu } from "lucide-react";

export default function TocadiscosPage() {
  const [turntables] = useState<Turntable[]>(MOCK_TURNTABLES);
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addItem } = useCartStore();

  const handleAddToCart = (tt: Turntable) => {
    addItem({
      id: tt.id,
      type: "turntable",
      title: tt.name,
      subtitle: `${tt.brand} — ${tt.cartridge}`,
      priceBs: tt.priceBs
    });
    setAddedId(tt.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* HEADER */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89D56]/15 border border-[#C89D56]/30 text-xs font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22]">
          <Cpu className="w-3.5 h-3.5" />
          <span>ALTA FIDELIDAD • CALIBRACIÓN INDIVIDUAL PRE-ENTREGA</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl text-theme-primary">
          Tocadiscos & Fuentes Analógicas
        </h1>

        <p className="text-sm sm:text-base text-theme-secondary font-light leading-relaxed">
          Cada tornamesa se desempaqueta en nuestro banco de pruebas para ajustar el azimut,
          fuerza de apoyo (tracking force) con balanza digital y control de anti-skating.
          La recibes lista para conectar a tu amplificador y disfrutar sin distorsión.
          Envíos asegurados en caja de madera reforzada a toda Bolivia.
        </p>
      </div>

      {/* TURNTABLES GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {turntables.map((tt) => (
          <div
            key={tt.id}
            className="rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            {/* Real Product Photography */}
            <div className="relative w-full h-64 sm:h-72 bg-black/10 dark:bg-black/25 overflow-hidden">
              <Image
                src={tt.image}
                alt={tt.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-[#C89D56] border border-white/10">
                {tt.brand}
              </div>
            </div>

            <div className="p-8 sm:p-10 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl text-theme-primary">
                    {tt.name}
                  </h2>
                  <p className="text-xs font-mono text-theme-muted mt-1">
                    {tt.driveType} • {tt.speeds}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
                  {tt.description}
                </p>

                {/* Features list */}
                <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] block font-semibold">
                    Componentes & Mecánica
                  </span>
                  <ul className="space-y-1.5 text-xs text-theme-secondary">
                    {tt.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#C89D56]">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specs Box */}
                <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 grid grid-cols-2 gap-3 text-xs font-mono">
                  {Object.entries(tt.specs).map(([key, val]) => (
                    <div key={key}>
                      <span className="text-theme-muted text-[10px] block uppercase">{key}</span>
                      <span className="text-theme-primary font-semibold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price and Add to Cart */}
              <div className="pt-6 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-theme-primary">
                    {tt.priceBs} Bs
                  </span>
                  <span className="block text-[11px] font-mono text-theme-muted">
                    Envío gratis asegurado a Bolivia
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(tt)}
                  className={`px-6 py-3 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-2 shadow-md ${
                    addedId === tt.id
                      ? "bg-[#5F6B50] text-white"
                      : "bg-[#C89D56] hover:bg-[#DDB36D] text-[#0E0E0C]"
                  }`}
                >
                  {addedId === tt.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Agregado al carrito</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Adquirir Tocadiscos</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SERVICE PROMISE */}
      <div className="p-8 rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-theme-muted shadow-sm">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#C89D56] shrink-0" />
          <div>
            <strong className="block text-theme-primary text-sm font-display">Garantía de 2 Años</strong>
            <span>Soporte técnico directo, repuestos originales de agujas y correas.</span>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Check className="w-5 h-5 text-[#5F6B50] shrink-0" />
          <div>
            <strong className="block text-theme-primary text-sm font-display">Calibración en Banco</strong>
            <span>Cada tornamesa se entrega nivelada y con la cápsula alineada con transportador Baerwald.</span>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Cpu className="w-5 h-5 text-[#C05436] shrink-0" />
          <div>
            <strong className="block text-theme-primary text-sm font-display">Asesoría de Preamplificación</strong>
            <span>Te orientamos sobre cómo conectar tu tornamesa a parlantes activos o amplificador vintage.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
