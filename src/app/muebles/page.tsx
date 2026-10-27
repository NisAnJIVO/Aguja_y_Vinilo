"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MOCK_FURNITURE } from "@/data/mock-furniture";
import { Furniture } from "@/data/types";
import { useCartStore } from "@/store/cartStore";
import { Hammer, Check, ShoppingBag, Clock, Ruler } from "lucide-react";

export default function MueblesPage() {
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addItem } = useCartStore();

  const handleAddToCart = (f: Furniture) => {
    addItem({
      id: f.id,
      type: "furniture",
      title: f.name,
      subtitle: `${f.wood} • ${f.capacity}`,
      priceBs: f.priceBs
    });
    setAddedId(f.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* HEADER */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BD5338]/15 border border-[#BD5338]/30 text-xs font-mono text-[#D26445]">
          <Hammer className="w-3.5 h-3.5" />
          <span>CARPINTERÍA DE AUTOR • HECHO CON VINILOS RECICLADOS</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl text-theme-primary">
          Mobiliario de Escucha
        </h1>

        <p className="text-sm sm:text-base text-theme-secondary font-light leading-relaxed">
          Muebles diseñados y forjados artesanalmente a pedido con despachos protegidos a toda Bolivia.
          Empleamos maderas nobles curadas (nogal, cedro, roble y mara recuperada) combinadas con separadores
          verticales termo-moldeados a partir de vinilos defectuosos prensados al calor.
          Estabilidad acústica garantizada contra resonancias de piso.
        </p>
      </div>

      {/* FURNITURE SHOWCASE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {MOCK_FURNITURE.map((f) => (
          <div
            key={f.id}
            className="rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            {/* Real Furniture Photography */}
            <div className="relative w-full h-64 sm:h-72 bg-black/10 dark:bg-black/25 overflow-hidden">
              <Image
                src={f.image}
                alt={f.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-[#C89D56] border border-white/10">
                {f.leadTime}
              </div>
            </div>

            <div className="p-8 sm:p-10 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] uppercase tracking-wider block font-semibold">
                  Mueble de Colección
                </span>
                <h2 className="font-display text-2xl sm:text-3xl text-theme-primary mt-1">
                  {f.name}
                </h2>

                <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
                  {f.description}
                </p>

                {/* Dimensions and lead time pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-theme-muted">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                    <Ruler className="w-4 h-4 text-[#C89D56] shrink-0" />
                    <span>{f.dimensions}</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                    <Clock className="w-4 h-4 text-[#C89D56] shrink-0" />
                    <span>{f.leadTime}</span>
                  </div>
                </div>

                {/* Features list */}
                <ul className="space-y-1.5 text-xs text-theme-secondary pt-2">
                  {f.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#C89D56]">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price and Add to Cart */}
              <div className="pt-6 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-theme-primary">
                    {f.priceBs} Bs
                  </span>
                  <span className="block text-[11px] font-mono text-theme-muted">
                    Capacidad: {f.capacity}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(f)}
                  className={`px-6 py-3 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-2 shadow-md ${
                    addedId === f.id
                      ? "bg-[#5F6B50] text-white"
                      : "bg-[#C89D56] hover:bg-[#DDB36D] text-[#0E0E0C]"
                  }`}
                >
                  {addedId === f.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Agregado al pedido</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Encargar Mueble</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
