import React, { Suspense } from "react";
import { BleepDiscosCatalog } from "@/components/catalog/BleepDiscosCatalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discos de Vinilo | Aguja & Vinilo",
  description: "Catálogo exclusivo de vinilos, ediciones limitadas y lanzamientos audiófilos seleccionados.",
};

export default function DiscosPage() {
  return (
    <main className="w-full min-h-screen bg-[#EDEDED]">
      <Suspense fallback={<div className="p-12 text-center font-mono text-xs text-neutral-500">Cargando catálogo...</div>}>
        <BleepDiscosCatalog />
      </Suspense>
    </main>
  );
}
