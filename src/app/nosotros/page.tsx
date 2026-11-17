import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { VinylCharacter } from "@/components/ui/VinylCharacter";

export const metadata: Metadata = {
  title: "Sobre Nosotros | Aguja & Vinilo",
  description: "Conoce Aguja & Vinilo, tienda virtual boliviana dedicada a la preservación y difusión de la cultura del formato físico y el sonido analógico.",
};

export default function NosotrosPage() {
  return (
    <main className="w-full min-h-screen bg-white text-black py-10 sm:py-24 px-4 sm:px-12 lg:px-16">
      <div className="w-full max-w-[1520px] mx-auto space-y-16 sm:space-y-24">
        
        {/* =====================================================================
            ENCABEZADO EDITORIAL
           ===================================================================== */}
        <div className="border-b border-black/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
              Manifiesto • Formato Físico • Est. 2026
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-black">
              Sobre Aguja &amp; Vinilo
            </h1>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-600">
            <span className="block font-bold text-neutral-900 text-sm">Bolivia • Envíos a los 9 Departamentos</span>
            <span>El formato físico no ha muerto</span>
          </div>
        </div>

        {/* =====================================================================
            BLOQUE 1: IDENTIDAD & PROPÓSITO
           ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 items-start">
          
          <div className="lg:col-span-5 space-y-5">
            {/* Nuestro amiguito protagonista con audífonos audiófilos */}
            <div className="mb-6">
              <VinylCharacter size={105} pose="headphones" />
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-black leading-tight">
              Creemos en la música que se toca, se contempla y se escucha sin prisas.
            </h2>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block">
              Sociedad Fundada en 2026 • Sucre, Chuquisaca, Bolivia
            </span>
          </div>

          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-neutral-700 leading-relaxed font-light">
            <p>
              En una época dominada por algoritmos efímeros, listas de reproducción desechables y audio ultra-comprimido, <strong className="font-medium text-neutral-900">Aguja &amp; Vinilo</strong> nace como una resistencia estética y sensorial. Creemos que un álbum es una obra de arte integral: su carátula en gran formato, el ritual mecánico de colocar la aguja sobre el surco y la calidez inigualable de la señal analógica pura.
            </p>
            <p>
              Operamos como una <strong className="font-medium text-neutral-900">tienda 100% virtual boliviana</strong> con alcance y despachos diarios a toda Bolivia. Seleccionamos cuidadosamente ediciones originales y reediciones audiófilas de vinilo virgen de 180g y 200g, garantizando que cada pieza conserve la fidelidad acústica con la que fue grabada en cinta original.
            </p>
            <p>
              Más que una tienda, somos un punto de encuentro para melómanos y coleccionistas. Curamos tocadiscos de tracción analógica, mobiliario acústico de autor fabricado en maderas nobles y accesorios esenciales para preservar tus colecciones por generaciones.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/discos"
                className="inline-block px-5 py-2.5 border border-black text-black hover:bg-black hover:text-white transition-colors text-xs font-mono uppercase tracking-wider"
              >
                Explorar Catálogo de Vinilos
              </Link>
              <Link
                href="/suscripcion"
                className="inline-block px-5 py-2.5 border border-neutral-300 text-neutral-700 hover:border-black hover:text-black transition-colors text-xs font-mono uppercase tracking-wider"
              >
                Club de Suscripción Plus
              </Link>
            </div>
          </div>

        </div>

        {/* Separador fino */}
        <div className="w-full border-b border-neutral-200" />

        {/* =====================================================================
            BLOQUE 2: LOS 4 PILARES (ESTILO EDITORIAL MINIMALISTA, SIN CARDS REDONDEADAS)
           ===================================================================== */}
        <div>
          <div className="mb-10 sm:mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
              Nuestros Estándares
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-neutral-900">
              Los 4 Pilares de Nuestra Curaduría
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
            
            <div className="space-y-3">
              <span className="font-mono text-xs text-neutral-400 block font-bold">01 / CALIDAD</span>
              <h4 className="font-serif text-xl font-normal text-neutral-900">
                Prensados Nuevos &amp; Sellados
              </h4>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                No vendemos copias piratas ni discos rayados. Todos nuestros títulos son nuevos, sellados de fábrica y en vinilo virgen pesado de 180g.
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs text-neutral-400 block font-bold">02 / LOGÍSTICA</span>
              <h4 className="font-serif text-xl font-normal text-neutral-900">
                Embalaje Rígido Multicapa
              </h4>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                Empacamos cada disco en cajas de cartón corrugado extra-reforzado con protectores de esquinas para que las carátulas lleguen intactas a cualquier rincón de Bolivia.
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs text-neutral-400 block font-bold">03 / SOPORTE</span>
              <h4 className="font-serif text-xl font-normal text-neutral-900">
                Asesoría Hi-Fi Personalizada
              </h4>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                Te asesoramos directamente por WhatsApp sobre cápsulas, calibración de contrapesos, amplificación y cuidado para sacar el mejor sonido a tu sistema.
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs text-neutral-400 block font-bold">04 / RESPALDO</span>
              <h4 className="font-serif text-xl font-normal text-neutral-900">
                Garantía Física Total
              </h4>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                Si un disco presenta algún defecto de fábrica o salto de aguja anormal, respondemos de inmediato con reposición o solución garantizada.
              </p>
            </div>

          </div>

          {/* Sello de inspección con nuestro amiguito */}
          <div className="pt-12 border-t border-black/10 flex items-center justify-start">
            <VinylCharacter size={95} pose="inspecting" />
          </div>
        </div>

      </div>
    </main>
  );
}
