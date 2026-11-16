"use client";

import React from "react";
import { DISCOS_CATALOG } from "@/data/discosData";
import { BleepVinylCard } from "./BleepVinylCard";

export const BleepDiscosCatalog: React.FC = () => {
  // Sección 1: 2 filas de 8 columnas = 16 discos
  const section1 = DISCOS_CATALOG.slice(0, 16);
  // Sección 2: 3 filas de 8 columnas = 24 discos
  const section2 = DISCOS_CATALOG.slice(16, 40);

  return (
    <section className="w-full bg-[#EDEDED] py-10 sm:py-16 px-4 sm:px-6 lg:px-8 text-black">
      <div className="w-full max-w-[1780px] mx-auto">
        
        {/* =====================================================================
            SECCIÓN 1: BLEEP EXCLUSIVES (2 FILAS DE 8 COLUMNAS = 16 DISCOS)
           ===================================================================== */}
        <div className="mb-14 sm:mb-18">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#111111] border-b border-[#111111] pb-1 inline-block">
              Bleep Exclusives
            </h2>
          </div>

          {/* Grilla: 2 col móvil, 4 col tablet, 6 col laptop, 8 columnas exactas en desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-x-3.5 sm:gap-x-4 lg:gap-x-5 gap-y-8 sm:gap-y-10">
            {section1.map((item) => (
              <BleepVinylCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Separador de sección Bleep */}
        <div className="w-full border-b border-gray-300 my-12 sm:my-16" />

        {/* =====================================================================
            SECCIÓN 2: LIMITED EDITIONS (3 FILAS DE 8 COLUMNAS = 24 DISCOS)
           ===================================================================== */}
        <div>
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#111111] border-b border-[#111111] pb-1 inline-block">
              Limited Editions
            </h2>
          </div>

          {/* Grilla de 3 filas de 8 columnas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-x-3.5 sm:gap-x-4 lg:gap-x-5 gap-y-8 sm:gap-y-10">
            {section2.map((item) => (
              <BleepVinylCard key={item.id} item={item} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
