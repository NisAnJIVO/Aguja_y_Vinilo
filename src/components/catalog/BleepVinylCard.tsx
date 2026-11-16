"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DiscoItem } from "@/data/discosData";

interface BleepVinylCardProps {
  item: DiscoItem;
}

export const BleepVinylCard: React.FC<BleepVinylCardProps> = ({ item }) => {
  const [imageError, setImageError] = useState(false);

  const fallbackImage =
    "https://upload.wikimedia.org/wikipedia/commons/5/5e/Disco_de_vinilo_-_Almendra.jpg";

  return (
    <div className="flex flex-col select-none">
      {/* Portada Cuadrada Limpia 1:1 sin animaciones */}
      <div className="relative w-full aspect-square bg-[#E0E0E0] overflow-hidden shadow-sm border border-black/5">
        <Image
          src={imageError ? fallbackImage : item.coverImage}
          alt={`${item.artist} - ${item.title}`}
          fill
          unoptimized
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
          className="object-cover"
          onError={() => setImageError(true)}
        />
      </div>

      {/* Metadatos Claros: Artista, Álbum, Formato y Precio únicamente en Bs */}
      <div className="pt-2 sm:pt-2.5 flex flex-col text-left">
        {/* Artista */}
        <h3 className="font-bold text-[13px] sm:text-[13.5px] lg:text-[14px] text-[#111111] leading-tight line-clamp-1">
          {item.artist}
        </h3>

        {/* Álbum */}
        <p className="text-[12px] sm:text-[12.5px] text-[#333333] leading-tight line-clamp-1 mt-0.5 font-normal">
          {item.title}
        </p>

        {/* Formato físico */}
        <p className="text-[11px] text-[#666666] leading-tight mt-0.5 line-clamp-1">
          {item.format}
        </p>

        {/* Precio en Bolivianos (Bs) */}
        <p className="text-[13px] sm:text-[13.5px] font-bold text-[#111111] mt-1 leading-tight">
          Bs. {item.priceBs}
        </p>
      </div>
    </div>
  );
};
