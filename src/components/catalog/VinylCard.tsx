"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useProductModalStore } from "@/store/productModalStore";
import { TiltCard } from "@/components/ui/TiltCard";

export interface VinylCardProps {
  id: string;
  slug?: string;
  title: string;
  artist: string;
  price: string | number;
  coverImage: string;
  catalogNumber?: string;
  speed?: string;
}

export const VinylCard: React.FC<VinylCardProps> = ({
  id,
  title,
  artist,
  price,
  coverImage,
}) => {
  const [imageError, setImageError] = useState(false);
  const { openModal } = useProductModalStore();

  const displayImage = imageError
    ? "https://upload.wikimedia.org/wikipedia/commons/5/5e/Disco_de_vinilo_-_Almendra.jpg"
    : coverImage;

  const numericPrice =
    typeof price === "number"
      ? price
      : parseInt(price.replace(/[^\d]/g, ""), 10) || 250;

  const formattedPrice =
    typeof price === "number"
      ? `Bs. ${price}`
      : price.toString().startsWith("$") || price.toString().startsWith("£") || price.toString().startsWith("Bs")
      ? price
      : `Bs. ${price}`;

  const handleOpenModal = () => {
    openModal({
      id,
      title,
      subtitle: artist,
      categoryLabel: "Vinilo Destacado",
      priceBs: numericPrice,
      image: displayImage,
      description: `Edición especial en vinilo virgen de alta fidelidad: "${title}" de ${artist}. Presentación oficial con funda rígida y prensado audiófilo de máxima pureza acústica.`,
      type: "vinyl",
    });
  };

  return (
    <TiltCard
      onClick={handleOpenModal}
      data-cursor="VER"
      className="group flex flex-col select-none cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
    >
      {/* Vinyl Cover Artwork con Borde Técnico Iluminado y Filtro Bürocratik */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#EEEEEE] border border-black/10 group-hover:border-black/50 group-hover:shadow-[0_0_15px_rgba(0,0,0,0.12)] transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
        <Image
          src={displayImage}
          alt={`${artist} - ${title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover saturate-75 contrast-110 group-hover:saturate-100 group-hover:contrast-100 group-hover:brightness-105 group-hover:scale-105 transition-[filter,transform] duration-200 ease-out"
          onError={() => setImageError(true)}
        />
        {/* Destello de contraste sutil tipo Bürocratik */}
        <div className="absolute inset-0 bg-white/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-100 mix-blend-overlay" />
      </div>

      {/* METADATA BLOCK: Exactly as in The Vinyl Factory screenshot */}
      <div className="pt-3.5 pb-1 flex flex-col">
        {/* Artist - Album Title */}
        <h3 className="font-serif text-sm sm:text-[15px] font-normal text-black leading-snug">
          <span className="font-medium text-black">{artist}</span>
          <span className="mx-1 text-neutral-400">-</span>
          <span className="text-neutral-900">{title}</span>
        </h3>

        {/* Price */}
        <p className="font-mono text-xs sm:text-[13px] text-neutral-700 mt-1 font-semibold">
          {formattedPrice}
        </p>
      </div>
    </TiltCard>
  );
};
