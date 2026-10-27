"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_CURATED_LIBRARIES } from "@/data/mock-curated";
import { MOCK_RECORDS } from "@/data/mock-records";
import { VinylDiscCover } from "@/components/ui/VinylDiscCover";
import { useCartStore } from "@/store/cartStore";
import {
  ArrowLeft,
  ShoppingBag,
  Check,
  Layers
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CuratedLibraryDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const library = MOCK_CURATED_LIBRARIES.find((l) => l.slug === slug);

  if (!library) {
    notFound();
  }

  const records = MOCK_RECORDS.filter((r) => library.recordIds.includes(r.id));
  const totalPrice = records.reduce((sum, r) => sum + r.priceBs, 0);
  const bundleDiscountPrice = Math.round(totalPrice * 0.9); // 10% bundle saving

  const [addedBundle, setAddedBundle] = useState(false);
  const { addItem } = useCartStore();

  const handleAddBundleToCart = () => {
    records.forEach((record) => {
      addItem({
        id: record.id,
        type: "vinyl",
        title: record.title,
        subtitle: `${record.artist} — Parte de Biblioteca: ${library.title}`,
        priceBs: Math.round(record.priceBs * 0.9),
        imageOrCover: record.coverPalette
      });
    });
    setAddedBundle(true);
    setTimeout(() => setAddedBundle(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* BREADCRUMB */}
      <nav className="flex items-center gap-2 text-xs font-mono text-theme-muted">
        <Link href="/bibliotecas" className="hover:text-[#C89D56] flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a Bibliotecas</span>
        </Link>
        <span>/</span>
        <span className="text-theme-primary truncate">{library.title}</span>
      </nav>

      {/* HEADER HERO */}
      <div className="p-8 sm:p-12 rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 space-y-6 relative overflow-hidden shadow-sm">
        <div className="space-y-3 relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-0.5 rounded bg-[#C89D56]/15 text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] font-semibold">
              {library.mood}
            </span>
            <span className="text-theme-muted">• {library.recordCount} LPs físicos</span>
            <span className="text-theme-muted">• Curador: {library.curator}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-theme-primary leading-tight">
            {library.title}
          </h1>

          <p className="text-sm sm:text-base text-theme-secondary font-light leading-relaxed">
            {library.description}
          </p>
        </div>

        {/* BUNDLE BUY STRIP */}
        <div className="pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-theme-primary">
                {bundleDiscountPrice} Bs
              </span>
              <span className="font-mono text-sm line-through text-theme-muted">
                {totalPrice} Bs
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#5F6B50] text-white">
                -10% Ahorro en Caja Completa
              </span>
            </div>
            <span className="text-[11px] font-mono text-theme-muted">
              Incluye estuche rígido y fundas protectoras para cada disco
            </span>
          </div>

          <button
            onClick={handleAddBundleToCart}
            className={`w-full sm:w-auto px-6 py-3.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-xl ${
              addedBundle
                ? "bg-[#5F6B50] text-white"
                : "bg-[#C89D56] hover:bg-[#DDB36D] text-[#0E0E0C]"
            }`}
          >
            {addedBundle ? (
              <>
                <Check className="w-4 h-4" />
                <span>¡Caja agregada a tu carrito!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Adquirir Biblioteca Completa ({bundleDiscountPrice} Bs)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* DISCS INCLUDED IN THIS LIBRARY */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22]">
          <Layers className="w-4 h-4" />
          <span>ORDEN SUGERIDO DE ESCUCHA ({records.length} DISCOS)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {records.map((record, index) => (
            <div
              key={record.id}
              className="p-6 rounded-xl bg-theme-card border border-black/10 dark:border-white/10 hover:border-[#C89D56]/40 transition-all flex flex-col sm:flex-row gap-6 items-center shadow-sm"
            >
              <div className="shrink-0">
                <VinylDiscCover record={record} size="sm" showSlideOutOnHover />
              </div>

              <div className="space-y-2 flex-1 min-w-0 text-center sm:text-left">
                <span className="text-[11px] font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] font-semibold">
                  Disco 0{index + 1} de {records.length}
                </span>

                <Link
                  href={`/catalogo/${record.slug}`}
                  className="font-display font-medium text-lg text-theme-primary hover:text-[#C89D56] transition-colors block truncate"
                >
                  {record.title}
                </Link>

                <p className="text-xs text-theme-secondary">{record.artist}</p>
                <p className="text-[11px] text-theme-muted line-clamp-2 leading-relaxed">
                  {record.curatorNote}
                </p>

                <div className="pt-2 flex items-center justify-between font-mono text-xs">
                  <span className="text-theme-primary font-bold">{record.priceBs} Bs</span>
                  <Link
                    href={`/catalogo/${record.slug}`}
                    className="text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] hover:underline text-[11px]"
                  >
                    Ver cortes →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
