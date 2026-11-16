"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_RECORDS } from "@/data/mock-records";
import { VinylDiscCover } from "@/components/ui/VinylDiscCover";
import { useCartStore } from "@/store/cartStore";
import { usePlayerStore } from "@/store/playerStore";
import {
  Play,
  Pause,
  Disc,
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
  Check,
  Radio,
  FileText
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function RecordDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const record = MOCK_RECORDS.find((r) => r.slug === slug);

  if (!record) {
    notFound();
  }

  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();
  const { currentRecord, currentTrackName, isPlaying, playRecord, togglePlay } = usePlayerStore();

  const isCurrentDisc = currentRecord?.id === record.id;

  const handleAddToCart = () => {
    addItem({
      id: record.id,
      type: "vinyl",
      title: record.title,
      subtitle: `${record.artist} — ${record.format}`,
      priceBs: record.priceBs,
      imageOrCover: record.coverPalette
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleTrackClick = (trackTitle: string) => {
    if (isCurrentDisc && currentTrackName === trackTitle) {
      togglePlay();
    } else {
      playRecord(record, trackTitle);
    }
  };

  const relatedRecords = MOCK_RECORDS.filter(
    (r) => r.id !== record.id && r.genre === record.genre
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* BREADCRUMB */}
      <nav className="flex items-center gap-2 text-xs font-mono text-theme-muted">
        <Link href="/catalogo" className="hover:text-[#C89D56] flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al Catálogo</span>
        </Link>
        <span>/</span>
        <span className="text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22]">{record.genre}</span>
        <span>/</span>
        <span className="text-theme-primary truncate">{record.title}</span>
      </nav>

      {/* MAIN HERO DETAIL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Large Vinyl Cover with Disc Sliding Out */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative p-6 sm:p-10 rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 shadow-xl flex items-center justify-center w-full">
            <VinylDiscCover record={record} size="xl" showSlideOutOnHover priority />
          </div>

          <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-theme-muted">
            <Radio className="w-3.5 h-3.5 text-[#C89D56]" />
            <span>Pasa el cursor sobre la funda o haz clic para escuchar</span>
          </div>
        </div>

        {/* Right: Album Details & Purchase Actions */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-0.5 rounded bg-[#C89D56]/15 text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] font-semibold">
                {record.genre}
              </span>
              <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-theme-secondary">
                {record.mood}
              </span>
              <span className="text-theme-muted font-mono">• {record.year} • {record.country}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-theme-primary leading-tight">
              {record.title}
            </h1>

            <h2 className="text-xl sm:text-2xl text-theme-secondary font-light">
              {record.artist}
            </h2>
          </div>

          {/* Pricing & Add to Cart Action */}
          <div className="p-6 rounded-xl bg-theme-card border border-black/10 dark:border-white/10 space-y-4 shadow-sm">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="font-mono text-3xl font-bold text-theme-primary">
                  {record.priceBs} Bs
                </span>
                <span className="block text-xs font-mono text-theme-muted mt-0.5">
                  Moneda nacional • Envíos a todo el país
                </span>
              </div>

              <div className="text-right text-xs font-mono">
                <span className="text-[#5F6B50] font-semibold flex items-center gap-1 justify-end">
                  <Check className="w-3.5 h-3.5" />
                  {record.stock} copias en stock
                </span>
                <span className="text-theme-muted">{record.weight} • {record.speed}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-6 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 shadow-xl ${
                  added
                    ? "bg-[#5F6B50] text-white"
                    : "bg-[#C89D56] hover:bg-[#DDB36D] text-[#0E0E0C]"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡Agregado a tu batea!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Agregar a la Colección ({record.priceBs} Bs)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleTrackClick(record.tracklist[0]?.title || record.title)}
                className="py-3.5 px-5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-theme-primary border border-black/10 dark:border-white/10 text-sm font-medium flex items-center gap-2"
              >
                {isCurrentDisc && isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current text-[#C89D56]" />
                    <span>Pausar Aguja</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current text-[#C89D56]" />
                    <span>Bajar Aguja (Escuchar)</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-theme-muted">
              <ShieldCheck className="w-4 h-4 text-[#C89D56]" />
              <span>Garantía de aguja: cero saltos y prensado plano certificado.</span>
            </div>
          </div>

          {/* Editorial Description & Curator Note */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-display font-medium text-lg text-theme-primary">
                Sobre esta Edición
              </h3>
              <p className="text-sm text-theme-secondary leading-relaxed font-light">
                {record.description}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-theme-surface border-l-4 border-[#C89D56] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] font-semibold">
                <FileText className="w-3.5 h-3.5" />
                <span>NOTA DEL CURADOR (AGUJA Y VINILO)</span>
              </div>
              <p className="text-xs text-theme-secondary leading-relaxed">
                &ldquo;{record.curatorNote}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TRACKLIST INTERACTIVE SECTION */}
      <section className="space-y-6 border-t border-black/10 dark:border-white/10 pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-display text-2xl text-theme-primary">Cortes del Disco</h3>
            <p className="text-xs text-theme-muted">
              Haz clic en cualquier pista para escuchar la simulación analógica.
            </p>
          </div>
          <span className="font-mono text-xs text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] font-semibold">
            Total: {record.tracklist.length} cortes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cara A */}
          <div className="p-5 rounded-xl bg-theme-card border border-black/10 dark:border-white/10 space-y-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-2 text-xs font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22]">
              <span className="font-bold">CARA A</span>
              <span>33 ⅓ RPM</span>
            </div>
            <div className="space-y-2">
              {record.tracklist
                .filter((t) => t.side === "A")
                .map((track) => {
                  const isTrackPlaying = isCurrentDisc && currentTrackName === track.title && isPlaying;
                  return (
                    <button
                      key={track.position}
                      onClick={() => handleTrackClick(track.title)}
                      className={`w-full text-left p-3 rounded-lg flex items-center justify-between text-xs transition-colors ${
                        isTrackPlaying
                          ? "bg-[#C89D56]/15 border border-[#C89D56]/40 text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] font-semibold"
                          : "hover:bg-black/5 dark:hover:bg-white/5 text-theme-primary"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-theme-muted w-6">{track.position}</span>
                        <span className="font-medium">{track.title}</span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-theme-muted">
                        <span>{track.duration}</span>
                        {isTrackPlaying ? (
                          <Disc className="w-3.5 h-3.5 text-[#C89D56] animate-spin" />
                        ) : (
                          <Play className="w-3.5 h-3.5 opacity-60" />
                        )}
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Cara B */}
          <div className="p-5 rounded-xl bg-theme-card border border-black/10 dark:border-white/10 space-y-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-2 text-xs font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22]">
              <span className="font-bold">CARA B</span>
              <span>33 ⅓ RPM</span>
            </div>
            <div className="space-y-2">
              {record.tracklist
                .filter((t) => t.side === "B")
                .map((track) => {
                  const isTrackPlaying = isCurrentDisc && currentTrackName === track.title && isPlaying;
                  return (
                    <button
                      key={track.position}
                      onClick={() => handleTrackClick(track.title)}
                      className={`w-full text-left p-3 rounded-lg flex items-center justify-between text-xs transition-colors ${
                        isTrackPlaying
                          ? "bg-[#C89D56]/15 border border-[#C89D56]/40 text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] font-semibold"
                          : "hover:bg-black/5 dark:hover:bg-white/5 text-theme-primary"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-theme-muted w-6">{track.position}</span>
                        <span className="font-medium">{track.title}</span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-theme-muted">
                        <span>{track.duration}</span>
                        {isTrackPlaying ? (
                          <Disc className="w-3.5 h-3.5 text-[#C89D56] animate-spin" />
                        ) : (
                          <Play className="w-3.5 h-3.5 opacity-60" />
                        )}
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL AUDIOPHILE ARCHIVE SPECIFICATIONS */}
      <section className="space-y-4 border-t border-black/10 dark:border-white/10 pt-12">
        <h3 className="font-display text-2xl text-theme-primary">Ficha Técnica del Prensado</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 font-mono text-xs">
          <div className="p-4 rounded-lg bg-theme-card border border-black/10 dark:border-white/10 shadow-sm">
            <span className="text-theme-muted block text-[10px] uppercase">Sello</span>
            <span className="text-theme-primary font-semibold mt-1 block truncate">{record.label}</span>
          </div>
          <div className="p-4 rounded-lg bg-theme-card border border-black/10 dark:border-white/10 shadow-sm">
            <span className="text-theme-muted block text-[10px] uppercase">No. Catálogo</span>
            <span className="text-theme-primary font-semibold mt-1 block">{record.catalogNumber}</span>
          </div>
          <div className="p-4 rounded-lg bg-theme-card border border-black/10 dark:border-white/10 shadow-sm">
            <span className="text-theme-muted block text-[10px] uppercase">Código Matriz</span>
            <span className="text-theme-primary font-semibold mt-1 block truncate">{record.matrixCode}</span>
          </div>
          <div className="p-4 rounded-lg bg-theme-card border border-black/10 dark:border-white/10 shadow-sm">
            <span className="text-theme-muted block text-[10px] uppercase">Gramaje</span>
            <span className="text-[#C89D56] font-semibold mt-1 block">{record.weight} Virgen</span>
          </div>
          <div className="p-4 rounded-lg bg-theme-card border border-black/10 dark:border-white/10 shadow-sm">
            <span className="text-theme-muted block text-[10px] uppercase">Velocidad</span>
            <span className="text-theme-primary font-semibold mt-1 block">{record.speed}</span>
          </div>
          <div className="p-4 rounded-lg bg-theme-card border border-black/10 dark:border-white/10 shadow-sm">
            <span className="text-theme-muted block text-[10px] uppercase">Origen</span>
            <span className="text-theme-primary font-semibold mt-1 block">{record.country}</span>
          </div>
        </div>
      </section>

      {/* RELATED RECORDS */}
      {relatedRecords.length > 0 && (
        <section className="space-y-6 border-t border-black/10 dark:border-white/10 pt-12">
          <h3 className="font-display text-2xl text-theme-primary">Discos con Frecuencias Similares</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedRecords.map((rel) => (
              <div key={rel.id} className="p-4 rounded-xl bg-theme-card border border-black/10 dark:border-white/10 space-y-3 shadow-sm">
                <Link href={`/catalogo/${rel.slug}`} className="flex justify-center">
                  <VinylDiscCover record={rel} size="md" showSlideOutOnHover />
                </Link>
                <div className="pt-2">
                  <Link
                    href={`/catalogo/${rel.slug}`}
                    className="font-display font-medium text-sm text-theme-primary hover:text-[#C89D56] transition-colors block truncate"
                  >
                    {rel.title}
                  </Link>
                  <p className="text-xs text-theme-muted truncate">{rel.artist}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-mono font-bold text-xs text-[#C89D56]">{rel.priceBs} Bs</span>
                    <span className="text-[10px] font-mono text-theme-muted">{rel.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
