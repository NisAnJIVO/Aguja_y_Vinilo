"use client";

import React, { useState } from "react";
import Image from "next/image";

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

  const displayImage = imageError
    ? "https://upload.wikimedia.org/wikipedia/commons/5/5e/Disco_de_vinilo_-_Almendra.jpg"
    : coverImage;

  const formattedPrice =
    typeof price === "number"
      ? `Bs. ${price}`
      : price.toString().startsWith("$") || price.toString().startsWith("£") || price.toString().startsWith("Bs")
      ? price
      : `Bs. ${price}`;

  return (
    <div className="group flex flex-col select-none cursor-pointer">
      {/* Vinyl Cover Artwork - Clean, without hover effects */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#EEEEEE] shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-opacity duration-200 group-hover:opacity-95">
        <Image
          src={displayImage}
          alt={`${artist} - ${title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          onError={() => setImageError(true)}
        />
      </div>

      {/* METADATA BLOCK: Exactly as in The Vinyl Factory screenshot */}
      <div className="pt-3.5 pb-1 flex flex-col">
        {/* Artist - Album Title */}
        <h3 className="text-sm sm:text-[15px] font-normal text-black leading-snug">
          <span className="font-medium text-black">{artist}</span>
          <span className="mx-1 text-gray-400">-</span>
          <span className="text-gray-900">{title}</span>
        </h3>

        {/* Price */}
        <p className="text-xs sm:text-[13px] text-gray-700 mt-1 font-normal">
          {formattedPrice}
        </p>
      </div>
    </div>
  );
};
