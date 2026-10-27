"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { useCartStore } from "@/store/cartStore";
import { Genre, Mood } from "@/data/types";
import { VinylDiscCover } from "@/components/ui/VinylDiscCover";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Package,
  Calendar,
  Lock,
  Unlock,
  Disc,
  Plus,
  X
} from "lucide-react";

const ALL_GENRES: Genre[] = [
  "Jazz & Bop",
  "Folk & Andino Psicodélico",
  "Rock Progresivo & Psicodelia",
  "Funk & Soul",
  "Electrónica & Ambient",
  "Bossa Nova & MPB",
  "Post-Punk & Wave"
];

const ALL_DECADES = ["60s", "70s", "80s", "90s", "2000s", "Actual"];

const ALL_MOODS: Mood[] = [
  "Madrugada Solitaria",
  "Concentración Profunda",
  "Celebración Cálida",
  "Nostalgia Dorada",
  "Viaje Psiconáutico",
  "Domingo Lento"
];

export default function SuscripcionPage() {
  const {
    step,
    preferences,
    boxReveals,
    isBoxGenerated,
    setStep,
    toggleGenre,
    toggleDecade,
    toggleMood,
    addOwnedArtist,
    removeOwnedArtist,
    setAdventureLevel,
    generateCuratedBox,
    revealWeek,
    resetOnboarding
  } = useSubscriptionStore();

  const [artistInput, setArtistInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addItem } = useCartStore();

  const handleAddArtist = (e: React.FormEvent) => {
    e.preventDefault();
    if (artistInput.trim()) {
      addOwnedArtist(artistInput.trim());
      setArtistInput("");
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      generateCuratedBox();
      setIsGenerating(false);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#C89D56", "#C05436", "#5F6B50", "#E8E2D5"]
        });
      } catch {
        // ignore
      }
    }, 1400);
  };

  const handleRevealWeek = (weekNumber: number) => {
    revealWeek(weekNumber);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#C89D56", "#C05436", "#DDD6C4"]
      });
    } catch {
      // ignore
    }
  };

  const handleSubscribe = () => {
    addItem({
      id: "sub-monthly-01",
      type: "subscription",
      title: "Suscripción Sorpresa Aguja y Vinilo",
      subtitle: "3 Discos al mes (1 por semana) • Edición Exclusiva Limitada",
      priceBs: 490
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* HEADER EDITORIAL BANNER */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C05436]/15 border border-[#C05436]/40 text-xs font-mono text-[#C05436]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PRODUCTO SIGNATURE • 3 DISCOS AL MES (1 POR SEMANA)</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-theme-primary leading-tight font-normal">
          La Curaduría Sorpresa
        </h1>

        <p className="text-sm sm:text-base text-theme-secondary font-light leading-relaxed">
          Un club de escucha privada para quienes no temen ser sorprendidos. Diseñamos tu perfil musical,
          analizamos lo que ya conoces y enviamos un disco exclusivo cada semana a tu casa con
          empaque serigrafiado y numeración de colección.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-theme-muted">
          <span>490 Bs / mes</span>
          <span>•</span>
          <span>1 disco por semana</span>
          <span>•</span>
          <span>Funda de serigrafía exclusiva</span>
          <span>•</span>
          <span>Envío gratis a toda Bolivia</span>
        </div>
      </div>

      {/* STEP PROGRESS INDICATOR */}
      <div className="max-w-xl mx-auto">
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
          {[
            { n: 1, label: "Géneros" },
            { n: 2, label: "Épocas & Moods" },
            { n: 3, label: "Tu Colección" },
            { n: 4, label: "Caja del Mes" }
          ].map((s) => (
            <button
              key={s.n}
              onClick={() => s.n <= 3 && setStep(s.n)}
              className={`py-2 border-b-2 transition-all ${
                step === s.n
                  ? "border-[#C89D56] text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] font-bold"
                  : step > s.n
                  ? "border-[#5F6B50] text-[#5F6B50]"
                  : "border-black/10 dark:border-white/10 text-theme-muted"
              }`}
            >
              <span>0{s.n}. {s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: GÉNEROS AUDITIVOS */}
      {step === 1 && (
        <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 space-y-8 shadow-sm">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] uppercase tracking-wider font-semibold">Paso 01 / 04</span>
            <h2 className="font-display text-2xl sm:text-3xl text-theme-primary">
              ¿Qué frecuencias resuenan en tu sala?
            </h2>
            <p className="text-xs text-theme-muted">
              Selecciona todos los géneros que disfrutas. Nuestro archivero balanceará la caja entre tus preferidos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ALL_GENRES.map((genre) => {
              const isSelected = preferences.genres.includes(genre);
              return (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`p-4 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-[#C89D56]/15 border-[#C89D56] text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] shadow-sm font-semibold"
                      : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-theme-secondary hover:border-[#C89D56]/50"
                  }`}
                >
                  <span>{genre}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#C89D56]" />}
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-4 border-t border-black/5 dark:border-white/5">
            <button
              onClick={() => setStep(2)}
              disabled={preferences.genres.length === 0}
              className="px-6 py-3 rounded-lg bg-[#C89D56] text-[#0E0E0C] font-semibold text-xs flex items-center gap-2 hover:bg-[#DDB36D] transition-colors disabled:opacity-50 shadow-md"
            >
              <span>Continuar a Épocas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: DÉCADAS Y ESTADOS DE ÁNIMO */}
      {step === 2 && (
        <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 space-y-8 shadow-sm">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] uppercase tracking-wider font-semibold">Paso 02 / 04</span>
            <h2 className="font-display text-2xl sm:text-3xl text-theme-primary">
              Épocas y atmósfera de escucha
            </h2>
            <p className="text-xs text-theme-muted">
              ¿En qué momentos del día pones el tocadiscos a girar?
            </p>
          </div>

          {/* Décadas */}
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase tracking-wider text-theme-muted block font-semibold">
              Décadas predilectas
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {ALL_DECADES.map((dec) => {
                const isSelected = preferences.decades.includes(dec);
                return (
                  <button
                    key={dec}
                    onClick={() => toggleDecade(dec)}
                    className={`py-2.5 rounded-lg border text-xs font-mono transition-all text-center ${
                      isSelected
                        ? "bg-[#C89D56] text-[#0E0E0C] font-bold border-[#C89D56] shadow-sm"
                        : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-theme-muted hover:text-theme-primary"
                    }`}
                  >
                    {dec}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Moods */}
          <div className="space-y-3 pt-4 border-t border-black/5 dark:border-white/5">
            <label className="text-xs font-mono uppercase tracking-wider text-theme-muted block font-semibold">
              Estados de ánimo
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {ALL_MOODS.map((mood) => {
                const isSelected = preferences.moods.includes(mood);
                return (
                  <button
                    key={mood}
                    onClick={() => toggleMood(mood)}
                    className={`p-3 rounded-lg border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-[#C89D56]/15 border-[#C89D56] text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] font-semibold"
                        : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-theme-secondary hover:text-theme-primary"
                    }`}
                  >
                    <span>{mood}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#C89D56]" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-black/5 dark:border-white/5">
            <button
              onClick={() => setStep(1)}
              className="text-xs font-mono text-theme-muted hover:text-theme-primary flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-3 rounded-lg bg-[#C89D56] text-[#0E0E0C] font-semibold text-xs flex items-center gap-2 hover:bg-[#DDB36D] transition-colors shadow-md"
            >
              <span>Continuar a Tu Colección</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: DISCOS QUE YA TIENES & NIVEL DE RIESGO */}
      {step === 3 && (
        <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 space-y-8 shadow-sm">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] uppercase tracking-wider font-semibold">Paso 03 / 04</span>
            <h2 className="font-display text-2xl sm:text-3xl text-theme-primary">
              Evitemos duplicados en tu estantería
            </h2>
            <p className="text-xs text-theme-muted">
              Dinos 2 o 3 artistas que ya tienes en vinilo para asegurarnos de no repetirlos y calibrar tus preferencias.
            </p>
          </div>

          {/* Owned artist input */}
          <form onSubmit={handleAddArtist} className="flex gap-2">
            <input
              type="text"
              value={artistInput}
              onChange={(e) => setArtistInput(e.target.value)}
              placeholder="Ej: Pink Floyd, Miles Davis, Wara..."
              className="flex-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 text-xs text-theme-primary focus:border-[#C89D56] focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-theme-primary hover:border-[#C89D56] flex items-center gap-1"
            >
              <Plus className="w-4 h-4 text-[#C89D56]" />
              <span>Añadir</span>
            </button>
          </form>

          {/* Owned artists chips */}
          {preferences.ownedArtists.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {preferences.ownedArtists.map((artist) => (
                <span
                  key={artist}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-theme-primary font-mono"
                >
                  <span>{artist}</span>
                  <button
                    type="button"
                    onClick={() => removeOwnedArtist(artist)}
                    className="text-theme-muted hover:text-[#C05436]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Adventure Slider */}
          <div className="space-y-3 pt-4 border-t border-black/5 dark:border-white/5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-mono uppercase tracking-wider text-theme-muted font-semibold">
                Nivel de Exploración Sonora
              </label>
              <span className="font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] font-bold">
                {preferences.adventureLevel === "curioso" && "Fiel a mis géneros base"}
                {preferences.adventureLevel === "explorador" && "Equilibrio entre clásicos y hallazgos"}
                {preferences.adventureLevel === "psiconauta" && "Vanguardia & rarezas ocultas"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs font-mono text-center">
              {[
                { val: "curioso" as const, label: "Curioso" },
                { val: "explorador" as const, label: "Explorador" },
                { val: "psiconauta" as const, label: "Psiconauta" }
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setAdventureLevel(opt.val)}
                  className={`py-2 rounded-lg border transition-all ${
                    preferences.adventureLevel === opt.val
                      ? "bg-[#C89D56] text-[#0E0E0C] font-bold border-[#C89D56] shadow-sm"
                      : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-theme-muted hover:text-theme-primary"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-black/5 dark:border-white/5">
            <button
              onClick={() => setStep(2)}
              className="text-xs font-mono text-theme-muted hover:text-theme-primary flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver</span>
            </button>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-7 py-3.5 rounded-lg bg-[#C89D56] hover:bg-[#DDB36D] text-[#0E0E0C] font-semibold text-xs flex items-center gap-2 shadow-xl transition-all transform hover:scale-105"
            >
              {isGenerating ? (
                <>
                  <Disc className="w-4 h-4 animate-spin" />
                  <span>Curando tu Caja...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Revelar la Caja de Este Mes</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: LA REVELACIÓN DE LA CAJA */}
      {step === 4 && isBoxGenerated && (
        <div className="space-y-12">
          <div className="p-8 sm:p-10 rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-6">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] uppercase tracking-widest flex items-center gap-2 font-semibold">
                  <Package className="w-4 h-4" />
                  <span>Caja Curada de Noviembre • Envío Semanal</span>
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-theme-primary">
                  Los 3 Discos de tu Mes
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={resetOnboarding}
                  className="px-3.5 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-xs font-mono text-theme-muted hover:text-theme-primary"
                >
                  Modificar Preferencias
                </button>

                <button
                  onClick={handleSubscribe}
                  className={`px-6 py-3 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all transform hover:scale-105 shadow-xl ${
                    addedToCart
                      ? "bg-[#5F6B50] text-white"
                      : "bg-[#C89D56] hover:bg-[#DDB36D] text-[#0E0E0C]"
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>¡Suscripción Agregada!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Suscribirme (490 Bs / mes)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* THREE WEEKS UNBOXING CARDS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {boxReveals.map((reveal) => (
                <div
                  key={reveal.week}
                  className="rounded-2xl border border-black/10 dark:border-white/10 bg-theme-surface flex flex-col justify-between overflow-hidden shadow-sm"
                >
                  {/* Top Bar with Week and Delivery Date */}
                  <div className="p-5 border-b border-black/10 dark:border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] font-bold">Semana 0{reveal.week}</span>
                    <span className="text-theme-muted flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {reveal.deliveryDate}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                    {reveal.isRevealed ? (
                      /* REVEALED STATE */
                      <div className="space-y-6">
                        <div className="flex justify-center">
                          <VinylDiscCover record={reveal.record} size="md" showSlideOutOnHover />
                        </div>

                        <div className="space-y-2 text-center">
                          <span className="text-[11px] font-mono text-[#C05436] font-semibold">
                            {reveal.themeTitle}
                          </span>
                          <h3 className="font-display font-medium text-lg text-theme-primary">
                            {reveal.record.title}
                          </h3>
                          <p className="text-xs text-theme-muted">{reveal.record.artist}</p>
                        </div>

                        {/* Exclusive packaging specs */}
                        <div className="p-3.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[11px] font-mono space-y-1.5 text-theme-secondary">
                          <div className="flex justify-between">
                            <span className="text-theme-muted">Empaque Exclusivo:</span>
                            <span className="text-[#C89D56] font-bold">{reveal.exclusiveArtNumber}</span>
                          </div>
                          <div className="text-[10px] text-theme-muted leading-tight">
                            {reveal.packagingDetails.paperType}
                          </div>
                          <div className="text-[10px] text-[#BD5338] leading-tight">
                            + {reveal.packagingDetails.specialInsert}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* SEALED / THEATRICAL LOCKED STATE */
                      <div className="text-center py-10 space-y-6 flex-1 flex flex-col items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-black/5 dark:bg-white/5 border-2 border-dashed border-[#C89D56]/40 flex flex-col items-center justify-center p-3 shadow-inner">
                          <Lock className="w-6 h-6 text-[#C89D56] mb-1" />
                          <span className="text-[8px] font-mono text-theme-muted uppercase tracking-wider">
                            Precinto Lacre
                          </span>
                        </div>

                        <div className="space-y-1 max-w-xs">
                          <h4 className="font-display font-medium text-base text-theme-primary">
                            {reveal.themeTitle}
                          </h4>
                          <p className="text-xs text-theme-muted leading-relaxed">
                            Copia serigrafiada con prensado directo de alta inercia. Seleccionada para expandir tu escucha.
                          </p>
                        </div>

                        <button
                          onClick={() => handleRevealWeek(reveal.week)}
                          className="px-4 py-2.5 rounded-lg bg-[#C89D56]/15 hover:bg-[#C89D56] text-[#C89D56] hover:text-[#0E0E0C] border border-[#C89D56]/40 text-xs font-semibold flex items-center gap-2 transition-all transform hover:scale-105"
                        >
                          <Unlock className="w-3.5 h-3.5" />
                          <span>Desprecintar y Revelar Disco</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Card bottom footer */}
                  <div className="p-4 bg-black/5 dark:bg-white/5 border-t border-black/10 dark:border-white/10 text-[11px] font-mono text-center text-theme-muted">
                    Prensado virgen 180g • Funda archivística incluida
                  </div>
                </div>
              ))}
            </div>

            {/* SUBSCRIPTION CALL TO ACTION FOOTER */}
            <div className="p-6 rounded-xl bg-theme-surface border border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <strong className="block text-sm text-theme-primary font-display">
                  Plan Mensual Sorpresa • 490 Bs / mes
                </strong>
                <p className="text-xs text-theme-muted">
                  Cancela o pausa en cualquier momento sin penalidad. Los 3 discos son tuyos para siempre.
                </p>
              </div>

              <button
                onClick={handleSubscribe}
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#C89D56] hover:bg-[#DDB36D] text-[#0E0E0C] font-semibold text-xs flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-2xl"
              >
                <Sparkles className="w-4 h-4" />
                <span>Unirme al Club de Suscripción (490 Bs)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
