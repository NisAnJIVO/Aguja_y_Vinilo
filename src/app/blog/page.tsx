import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { VinylCharacter } from "@/components/ui/VinylCharacter";

export const metadata: Metadata = {
  title: "Blog & Crónicas Sonoras | Aguja & Vinilo",
  description: "Artículos, guías sobre tornamesas, cuidado del vinilo y reseñas de discos en Aguja & Vinilo Bolivia.",
};

const ARTICULOS = [
  {
    slug: "por-que-vinilo-180g",
    categoria: "Guías Técnicas & Prensado",
    titulo: "¿Por qué importa el peso de 180 gramos en un disco de vinilo?",
    extracto:
      "Descubre la diferencia física y acústica entre un prensado estándar de los años 80 y los modernos prensados pesados de 180g y 200g virgen. Mayor estabilidad, menor resonancia parasitaria y durabilidad de los surcos frente al desgaste de la aguja.",
    fecha: "Noviembre 2026",
    tiempoLectura: "4 min",
  },
  {
    slug: "como-calibrar-tornamesa",
    categoria: "Mantenimiento Hi-Fi & Calibración",
    titulo: "Guía paso a paso: Cómo equilibrar el contrapeso y anti-skating de tu tornamesa",
    extracto:
      "Evita el desgaste prematuro de tus surcos y de la aguja con esta guía sencilla para equilibrar el brazo en 5 pasos. Ajuste de tracking force con balanza digital y verificación óptica de alineación de cápsula.",
    fecha: "Noviembre 2026",
    tiempoLectura: "6 min",
  },
  {
    slug: "10-albumes-esenciales-rock-latino",
    categoria: "Curaduría & Archivo Musical",
    titulo: "10 álbumes fundamentales del Rock en Español que debes escuchar en vinilo",
    extracto:
      "Desde el prensado histórico de Artaud hasta las reediciones conmemorativas de Bocanada y Canción Animal. Un recorrido por las obras maestras que definieron la identidad sonora de nuestro continente.",
    fecha: "Noviembre 2026",
    tiempoLectura: "5 min",
  },
  {
    slug: "cuidado-de-fundas-antiestaticas",
    categoria: "Accesorios & Conservación",
    titulo: "Fundas interiores de polietileno: El escudo definitivo contra la estática y el polvo",
    extracto:
      "Por qué nunca debes conservar tus discos en fundas de papel ordinario que desprenden celulosa. La ciencia detrás del polietileno de alta densidad para evitar chasquidos en la reproducción.",
    fecha: "Noviembre 2026",
    tiempoLectura: "3 min",
  },
];

export default function BlogPage() {
  return (
    <main className="w-full min-h-screen bg-white text-black py-10 sm:py-24 px-4 sm:px-12 lg:px-16">
      <div className="w-full max-w-[1520px] mx-auto space-y-16 sm:space-y-24">
        
        {/* =====================================================================
            ENCABEZADO EDITORIAL
           ===================================================================== */}
        <div className="border-b border-black/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
              Crónicas • Reseñas • Cultura Analógica
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-black">
              Blog &amp; Archivo Sonoro
            </h1>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-600">
            <span className="block font-bold text-neutral-900 text-sm">Artículos para Audiófilos</span>
            <span>Est. 2026 • Curaduría Escrita</span>
          </div>
        </div>

        {/* =====================================================================
            BLOQUE PRINCIPAL: INTRODUCCIÓN EDITORIAL
           ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 items-start">
          
          <div className="lg:col-span-4 space-y-5">
            {/* Nuestro amiguito protagonista leyendo la crónica */}
            <div className="mb-6">
              <VinylCharacter size={105} pose="reading" />
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-black leading-tight">
              Palabras dedicadas a la fidelidad sonora.
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              Ensayos técnicos, guías de conservación y análisis de prensados históricos.
            </p>
          </div>

          <div className="lg:col-span-8 divide-y divide-neutral-200">
            {ARTICULOS.map((art, idx) => (
              <article key={art.slug} className={`py-8 sm:py-10 ${idx === 0 ? "pt-0" : ""}`}>
                <div className="flex items-center justify-between font-mono text-xs text-neutral-400 mb-2">
                  <span className="uppercase tracking-wider font-semibold text-neutral-600">
                    {art.categoria}
                  </span>
                  <span>{art.fecha} • {art.tiempoLectura}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-900 leading-snug hover:opacity-75 transition-opacity">
                  <Link href={`/discos?q=${encodeURIComponent(art.slug)}`}>
                    {art.titulo}
                  </Link>
                </h3>

                <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-light mt-3">
                  {art.extracto}
                </p>

                <div className="mt-4">
                  <Link
                    href={`/discos`}
                    className="inline-block text-xs font-mono uppercase tracking-wider text-black border-b border-black pb-0.5 hover:opacity-60 transition-opacity"
                  >
                    Explorar Títulos Relacionados &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>

      </div>
    </main>
  );
}
