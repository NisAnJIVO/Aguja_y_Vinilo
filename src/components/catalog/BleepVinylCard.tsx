"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DiscoItem } from "@/data/discosData";
import { useProductModalStore } from "@/store/productModalStore";
import { useLanguage } from "@/context/LanguageContext";

interface BleepVinylCardProps {
  item: DiscoItem;
}

export const BleepVinylCard: React.FC<BleepVinylCardProps> = ({ item }) => {
  const [imageError, setImageError] = useState(false);
  const { openModal } = useProductModalStore();
  const { language } = useLanguage();

  const isEn = language === "en";

  const fallbackImage =
    "https://upload.wikimedia.org/wikipedia/commons/5/5e/Disco_de_vinilo_-_Almendra.jpg";

  const handleOpenModal = () => {
    openModal({
      id: item.id,
      title: item.title,
      subtitle: item.artist,
      categoryLabel: isEn ? `Vinyl • ${item.year}` : `Vinilo • ${item.year}`,
      format: item.format,
      priceBs: item.priceBs,
      image: imageError ? fallbackImage : item.coverImage,
      description: isEn
        ? `Special edition album "${item.title}" by ${item.artist}. Features the hit track "${item.song}". Format: ${item.format} (${item.year}). High fidelity pressing for collectors.`
        : `Álbum de ${item.artist} en edición especial "${item.title}". Incluye la canción destacada "${item.song}". Formato: ${item.format} (${item.year}). Edición prensada para coleccionistas con audio de alta fidelidad.`,
      type: "vinyl",
    });
  };

  return (
    <div
      onClick={handleOpenModal}
      className="flex flex-col select-none cursor-pointer group transition-transform duration-200 hover:-translate-y-0.5"
    >
      {/* Portada Cuadrada Limpia 1:1 */}
      <div className="relative w-full aspect-square bg-[#E0E0E0] overflow-hidden shadow-sm border border-black/5 group-hover:shadow-md transition-shadow">
        <Image
          src={imageError ? fallbackImage : item.coverImage}
          alt={`${item.artist} - ${item.title}`}
          fill
          unoptimized
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
          onError={() => setImageError(true)}
        />
      </div>

      {/* Metadatos Claros: Artista, Álbum, Formato y Precio únicamente en Bs */}
      <div className="pt-2 sm:pt-2.5 flex flex-col text-left">
        {/* Artista */}
        <h3 className="font-serif text-[14px] sm:text-[15px] font-normal text-[#111111] leading-tight line-clamp-1 group-hover:opacity-75 transition-opacity">
          {item.artist}
        </h3>

        {/* Álbum */}
        <p className="font-sans text-[12px] sm:text-[12.5px] text-neutral-600 leading-tight line-clamp-1 mt-0.5 font-light">
          {item.title}
        </p>

        {/* Formato físico */}
        <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 leading-tight mt-0.5 line-clamp-1">
          {item.format}
        </p>

        {/* Precio en Bolivianos (Bs) */}
        <p className="text-[13px] sm:text-[13.5px] font-bold text-[#111111] mt-1 leading-tight font-mono">
          Bs. {item.priceBs}
        </p>
      </div>
    </div>
  );
};
