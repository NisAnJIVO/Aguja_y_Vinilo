import React from "react";
import { ExtrasCatalog } from "@/components/extras/ExtrasCatalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Extras & Cuidado | Aguja & Vinilo",
  description: "Fundas protectoras antiestáticas, cepillos de fibra de carbono, líquidos de limpieza, accesorios y objetos esenciales para coleccionistas de vinilos.",
};

export default function ExtrasPage() {
  return (
    <main className="w-full min-h-screen bg-[#EDEDED]">
      <ExtrasCatalog />
    </main>
  );
}
