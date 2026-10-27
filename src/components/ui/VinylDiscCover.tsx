"use client";

import React, { useState } from "react";
import Image from "next/image";
import { VinylRecord } from "@/data/types";
import { usePlayerStore } from "@/store/playerStore";
import { Disc3, Play, Pause } from "lucide-react";

interface VinylDiscCoverProps {
  record: VinylRecord;
  size?: "sm" | "md" | "lg" | "xl";
  showSlideOutOnHover?: boolean;
  priority?: boolean;
}

export const VinylDiscCover: React.FC<VinylDiscCoverProps> = ({
  record,
  size = "md",
  showSlideOutOnHover = true,
  priority = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { currentRecord, isPlaying, playRecord, togglePlay } = usePlayerStore();

  const isCurrentPlaying = currentRecord?.id === record.id && isPlaying;

  const sizeClasses = {
    sm: "w-36 h-36",
    md: "w-56 h-56 md:w-64 md:h-64",
    lg: "w-72 h-72 md:w-80 md:h-80",
    xl: "w-80 h-80 md:w-96 md:h-96",
  }[size];

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentRecord?.id === record.id) {
      togglePlay();
    } else {
      playRecord(record);
    }
  };

  return (
    <div
      className={`relative inline-block ${sizeClasses} select-none group perspective-[1000px]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Physical Vinyl Disc sliding out from sleeve */}
      <div
        className={`absolute top-0 right-0 w-full h-full rounded-full vinyl-grooves transition-all duration-700 ease-out pointer-events-none ${
          (showSlideOutOnHover && isHovered) || isCurrentPlaying
            ? "translate-x-[42%] rotate-45 shadow-2xl"
            : "translate-x-0 rotate-0"
        } ${isCurrentPlaying ? "animate-spin-slow" : ""}`}
        style={{ zIndex: 1 }}
      >
        {/* Light sheen layer */}
        <div className="absolute inset-0 rounded-full vinyl-sheen pointer-events-none" />

        {/* Center Paper Label */}
        <div className="absolute inset-0 m-auto w-[36%] h-[36%] rounded-full bg-[#EDE6D8] border-4 border-[#12110F] flex flex-col items-center justify-center p-2 text-center shadow-inner">
          <span className="text-[7px] font-mono tracking-widest text-[#161513] uppercase font-bold">
            Aguja & Vinilo
          </span>
          <span className="text-[7px] text-[#A23E23] font-medium truncate max-w-[90%]">
            {record.title}
          </span>
          <span className="text-[5px] text-[#524F47] font-mono mt-0.5">{record.speed}</span>
          {/* Spindle hole */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#0E0E0C] border border-[#DDD6C4] mt-0.5" />
        </div>
      </div>

      {/* Front Gatefold Cardboard Sleeve */}
      <div
        className="relative w-full h-full rounded-sm overflow-hidden shadow-xl border border-black/10 dark:border-white/10 bg-[#161513] transition-transform duration-500 group-hover:-translate-x-1"
        style={{ zIndex: 2 }}
      >
        {record.coverImage && !imageError ? (
          <Image
            src={record.coverImage}
            alt={`${record.title} — ${record.artist}`}
            fill
            sizes="(max-width: 768px) 256px, 384px"
            priority={priority}
            onError={() => setImageError(true)}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Minimalist typographic fallback if offline/error */
          <div
            className="w-full h-full flex flex-col justify-between p-5"
            style={{
              backgroundColor: record.coverPalette.bg,
              color: record.coverPalette.text,
            }}
          >
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase opacity-75">
                {record.genre}
              </span>
              <h4 className="font-display font-bold text-lg mt-1 leading-snug">
                {record.artist}
              </h4>
            </div>
            <div>
              <p className="font-display text-base font-semibold">
                {record.title}
              </p>
              <span className="text-[9px] font-mono opacity-60">
                {record.year} • {record.speed}
              </span>
            </div>
          </div>
        )}

        {/* Physical cardboard sheen reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/10 pointer-events-none" />

        {/* Gatefold spine shadow edge */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />

        {/* Interactive Audio Play Button */}
        <button
          onClick={handlePlayClick}
          aria-label={isCurrentPlaying ? `Pausar ${record.title}` : `Escuchar muestra de ${record.title}`}
          className={`absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-lg ${
            isCurrentPlaying
              ? "bg-[#C89D56] text-[#0E0E0C] scale-105 opacity-100"
              : "bg-[#0E0E0C]/85 text-[#F6F3EC] hover:bg-[#C89D56] hover:text-[#0E0E0C] opacity-0 group-hover:opacity-100 focus:opacity-100"
          }`}
        >
          {isCurrentPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current translate-x-0.5" />
          )}
        </button>

        {/* Playing Badge indicator (Clean, non-pulsing) */}
        {isCurrentPlaying && (
          <div className="absolute top-3 left-3 bg-[#C89D56] text-[#0E0E0C] text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded flex items-center gap-1 shadow-md">
            <Disc3 className="w-3 h-3 animate-spin" />
            SONANDO
          </div>
        )}
      </div>
    </div>
  );
};
