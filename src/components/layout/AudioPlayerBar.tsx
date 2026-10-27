"use client";

import React from "react";
import Link from "next/link";
import { usePlayerStore } from "@/store/playerStore";
import { Play, Pause, Volume2, VolumeX, Disc3, X, Radio } from "lucide-react";

export const AudioPlayerBar: React.FC = () => {
  const {
    currentRecord,
    currentTrackName,
    isPlaying,
    isCrackleEnabled,
    volume,
    togglePlay,
    toggleCrackle,
    setVolume,
    stop,
  } = usePlayerStore();

  if (!currentRecord) return null;

  return (
    <aside
      aria-label="Reproductor analógico"
      className="fixed bottom-0 left-0 right-0 z-30 bg-[#141311]/95 backdrop-blur-xl border-t border-white/10 px-4 py-2.5 shadow-2xl transition-transform duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* DISC & TRACK INFO */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Mini spinning vinyl thumbnail */}
          <div className="relative w-11 h-11 shrink-0 rounded-full vinyl-grooves flex items-center justify-center border border-white/10 shadow">
            <div className={`w-4 h-4 rounded-full bg-[#C89D56] ${isPlaying ? "animate-spin" : ""}`} />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-display font-semibold text-xs sm:text-sm text-[#F6F3EC] truncate">
                {currentTrackName || currentRecord.title}
              </span>
              <span className="hidden md:inline-block text-[10px] font-mono text-[#C89D56] bg-[#C89D56]/10 px-1.5 py-0.5 rounded">
                {currentRecord.genre}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#A89D84]">
              <span className="truncate">{currentRecord.artist}</span>
              <span>•</span>
              <span className="font-mono">{currentRecord.speed}</span>
              {currentRecord.bpm && (
                <span className="hidden sm:inline font-mono text-[#8B826B]">
                  • {currentRecord.bpm} BPM
                </span>
              )}
            </div>
          </div>
        </div>

        {/* CENTRAL AUDIO CONTROLS */}
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pausar aguja" : "Bajar aguja y reproducir"}
            className="w-10 h-10 rounded-full bg-[#C89D56] text-[#0E0E0C] hover:bg-[#DDB36D] flex items-center justify-center transition-transform hover:scale-105 shadow-md"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current translate-x-0.5" />
            )}
          </button>

          {/* Analog Needle Crackle Toggle */}
          <button
            onClick={toggleCrackle}
            title={isCrackleEnabled ? "Desactivar crujido analógico" : "Activar crujido analógico"}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border transition-colors ${
              isCrackleEnabled
                ? "border-[#C89D56]/40 text-[#C89D56] bg-[#C89D56]/10"
                : "border-white/10 text-[#6F6B60] hover:text-[#EDE8DC]"
            }`}
          >
            <Radio className="w-3 h-3" />
            <span>CRUJIDO ANALÓGICO</span>
          </button>
        </div>

        {/* RIGHT UTILITIES: VOLUME & DETAIL LINK */}
        <div className="flex items-center gap-4">
          {/* Volume Slider */}
          <div className="hidden lg:flex items-center gap-2 text-[#A89D84]">
            {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              aria-label="Volumen analógico"
              className="w-20 accent-[#C89D56] h-1 bg-[#282722] rounded-lg cursor-pointer"
            />
          </div>

          {/* View Record Details Link */}
          <Link
            href={`/catalogo/${currentRecord.slug}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#C89D56] hover:underline font-medium"
          >
            <Disc3 className="w-3.5 h-3.5" />
            <span>Ver disco</span>
          </Link>

          {/* Close bar */}
          <button
            onClick={stop}
            aria-label="Cerrar reproductor"
            className="p-1.5 text-[#8B826B] hover:text-[#F6F3EC] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
