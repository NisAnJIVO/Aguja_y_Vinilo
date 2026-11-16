import React from "react";
import { CosmosMasonryGrid } from "@/components/extras/CosmosMasonryGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Extras & Curaduría | Aguja & Vinilo",
  description: "Poleras gráficas con arte de álbumes, cuadros de vinilo, pines esmaltados y accesorios para audiófilos.",
};

export default function ExtrasPage() {
  return (
    <main className="w-full min-h-screen bg-[#EDEDED]">
      <CosmosMasonryGrid />
    </main>
  );
}
