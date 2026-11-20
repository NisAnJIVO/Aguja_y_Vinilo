"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DiscoItem } from "@/data/discosData";
import { useProductModalStore } from "@/store/productModalStore";
import { useLanguage } from "@/context/LanguageContext";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { Plus } from "lucide-react";

interface BleepVinylCardProps {
  item: DiscoItem;
}

export const BleepVinylCard: React.FC<BleepVinylCardProps> = ({ item }) => {
  const [imageError, setImageError] = useState(false);
  const { openModal } = useProductModalStore();
  const { language } = useLanguage();
  const { addItem } = useCartStore();
  const { showToast } = useToastStore();

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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(
      {
        id: item.id,
        type: "vinyl",
        title: item.title,
        subtitle: item.artist,
        priceBs: item.priceBs,
        imageOrCover: imageError ? fallbackImage : item.coverImage,
      },
      1
    );
    showToast(item.title);
  };

  return (
    <div
      onClick={handleOpenModal}
      className="vinyl-grid-card flex flex-col select-none cursor-pointer group transition-all duration-200 group-hover/grid:opacity-45 hover:!opacity-100"
    >
      {/* Portada Cuadrada Limpia 1:1 con Zoom Seco (scale 1.05) y Botón Deslizante */}
      <div className="relative w-full aspect-square bg-[#E0E0E0] overflow-hidden shadow-sm border border-black/5 group-hover:shadow-md transition-shadow">
        <Image
          src={imageError ? fallbackImage : item.coverImage}
          alt={`${item.artist} - ${item.title}`}
          fill
          unoptimized
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
          className="object-cover group-hover:scale-105 transition-transform duration-200 ease-out"
          onError={() => setImageError(true)}
        />

        {/* Botón AGREGAR AL CARRITO deslizándose desde el borde inferior sin bordes redondeados */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="absolute inset-x-0 bottom-0 bg-black text-white font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider py-2.5 px-2 flex items-center justify-center gap-1.5 transition-transform duration-200 ease-out translate-y-full group-hover:translate-y-0 rounded-none border-t border-white/20 hover:bg-neutral-900 active:bg-neutral-800 z-10 cursor-pointer shadow-lg"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{isEn ? "Add to Cart" : "Agregar al Carrito"}</span>
        </button>
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
