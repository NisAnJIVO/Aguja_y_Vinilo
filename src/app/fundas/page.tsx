"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MOCK_SLEEVES } from "@/data/mock-sleeves";
import { SleeveAndCare } from "@/data/types";
import { useCartStore } from "@/store/cartStore";
import { Shield, Check, ShoppingBag } from "lucide-react";

export default function FundasPage() {
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addItem } = useCartStore();

  const handleAddToCart = (sleeve: SleeveAndCare) => {
    addItem({
      id: sleeve.id,
      type: "sleeve",
      title: sleeve.name,
      subtitle: `${sleeve.category} • ${sleeve.packSize}`,
      priceBs: sleeve.priceBs
    });
    setAddedId(sleeve.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* HEADER */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89D56]/15 border border-[#C89D56]/30 text-xs font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22]">
          <Shield className="w-3.5 h-3.5" />
          <span>CONSERVACIÓN ARCHIVÍSTICA • PREVENCIÓN DE CARGA ESTÁTICA</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl text-theme-primary">
          Fundas & El Ritual de Cuidado
        </h1>

        <p className="text-sm sm:text-base text-theme-secondary font-light leading-relaxed">
          Un vinilo bien cuidado sobrevive a su dueño. Nuestras fundas de grado museo y herramientas
          de limpieza están concebidas para erradicar el enemigo número uno del acetato: la fricción
          electrostática y el polvo microscópico que se incrusta en el surco sonoro.
        </p>
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MOCK_SLEEVES.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            {/* Real Product Photography */}
            <div className="relative w-full h-56 sm:h-64 bg-black/10 dark:bg-black/25 overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-[#C89D56] border border-white/10">
                {item.packSize}
              </div>
            </div>

            <div className="p-8 space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] uppercase tracking-wider block font-semibold">
                  {item.category}
                </span>
                <h2 className="font-display text-xl sm:text-2xl text-theme-primary leading-snug">
                  {item.name}
                </h2>
                <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2 border-t border-black/5 dark:border-white/5 space-y-1.5 text-xs text-theme-secondary">
                  <span className="text-[10px] font-mono uppercase text-theme-muted block">Materiales:</span>
                  <p className="text-xs font-mono text-theme-muted">{item.material}</p>
                </div>

                <ul className="space-y-1 text-xs text-theme-secondary pt-2">
                  {item.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#C89D56]">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                <div>
                  <span className="font-mono text-2xl font-bold text-theme-primary">
                    {item.priceBs} Bs
                  </span>
                  <span className="block text-[11px] font-mono text-theme-muted">
                    {item.packSize}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  className={`px-5 py-2.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-2 shadow-md ${
                    addedId === item.id
                      ? "bg-[#5F6B50] text-white"
                      : "bg-[#C89D56] hover:bg-[#DDB36D] text-[#0E0E0C]"
                  }`}
                >
                  {addedId === item.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Agregado</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Agregar al Carrito</span>
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
