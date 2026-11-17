import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { VinylCharacter } from "@/components/ui/VinylCharacter";

export const metadata: Metadata = {
  title: "Políticas de Devolución & Garantía | Aguja & Vinilo",
  description: "Protocolo de garantía acústica de prensado, reemplazos de fábrica y devoluciones de Aguja & Vinilo en Bolivia.",
};

export default function DevolucionesPage() {
  return (
    <main className="w-full min-h-screen bg-white text-black py-10 sm:py-24 px-4 sm:px-12 lg:px-16">
      <div className="w-full max-w-[1520px] mx-auto space-y-16 sm:space-y-24">
        
        {/* =====================================================================
            ENCABEZADO EDITORIAL
           ===================================================================== */}
        <div className="border-b border-black/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
              Respaldo &amp; Garantía Física • Est. 2026
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-black">
              Políticas de Devolución
            </h1>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-600">
            <span className="block font-bold text-neutral-900 text-sm">Garantía Acústica de Prensado</span>
            <span>Reposición inmediata ante fallas de fábrica</span>
          </div>
        </div>

        {/* =====================================================================
            BLOQUE 1: COMPROMISO DE CALIDAD
           ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 items-start">
          
          <div className="lg:col-span-5 space-y-5">
            {/* Nuestro amiguito protagonista inspeccionando con lupa */}
            <div className="mb-6">
              <VinylCharacter size={105} pose="inspecting" />
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-black leading-tight">
              Solo piezas en perfecto estado sonoro entran a tu colección.
            </h2>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block">
              Garantía de Fábrica &amp; Reproducción Sin Defectos
            </span>
          </div>

          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-neutral-700 leading-relaxed font-light">
            <p>
              Todos los vinilos distribuidos por <strong className="font-medium text-neutral-900">Aguja &amp; Vinilo</strong> son ejemplares nuevos, sellados de origen en prensados de 180g o 200g virgen. No vendemos copias usadas, discos con marcas de uso ni reproducciones clandestinas.
            </p>
            <p>
              Si al desprecintar y reproducir tu disco identificas un <strong className="font-medium text-neutral-900">defecto de fabricación comprobable</strong> (alabeo excesivo de fábrica, salto repetitivo de aguja en tornamesa correctamente calibrada o ruido superficial severo de prensado), tienes derecho a la reposición sin coste adicional.
            </p>
            <p>
              Para tocadiscos y hardware analógico, ofrecemos 6 meses de garantía técnica directa sobre el motor, cápsula y sistema de tracción.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="https://wa.me/59168610314?text=Hola,%20deseo%20consultar%20sobre%20la%20garantía%20o%20devolución%20de%20un%20disco."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2.5 border border-black text-black hover:bg-black hover:text-white transition-colors text-xs font-mono uppercase tracking-wider"
              >
                Reportar Caso por WhatsApp (+591 68610314)
              </a>
              <Link
                href="/contacto"
                className="inline-block px-5 py-2.5 border border-neutral-300 text-neutral-700 hover:border-black hover:text-black transition-colors text-xs font-mono uppercase tracking-wider"
              >
                Canales de Atención
              </Link>
            </div>
          </div>

        </div>

        {/* Separador fino */}
        <div className="w-full border-b border-neutral-200" />

        {/* =====================================================================
            BLOQUE 2: PASO A PASO PARA REEMPLAZOS (ESTILO EDITORIAL)
           ===================================================================== */}
        <div>
          <div className="mb-10 sm:mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
              Protocolo de Asistencia
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-neutral-900">
              ¿Cómo solicitar un reemplazo o devolución?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12">
            
            <div className="space-y-3 font-mono text-xs">
              <span className="text-neutral-400 block font-bold">PASO 01 / PLAZO</span>
              <h4 className="font-serif text-xl font-normal text-neutral-900">
                Plazo de 7 Días
              </h4>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                Comunícate con nosotros dentro de los primeros 7 días naturales posteriores a la entrega del paquete por encomienda.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <span className="text-neutral-400 block font-bold">PASO 02 / EVIDENCIA</span>
              <h4 className="font-serif text-xl font-normal text-neutral-900">
                Video Demostrativo
              </h4>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                Envía un breve video a nuestro WhatsApp mostrando la reproducción en tu tornamesa donde se aprecie la anomalía acústica o el salto.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <span className="text-neutral-400 block font-bold">PASO 03 / RESOLUCIÓN</span>
              <h4 className="font-serif text-xl font-normal text-neutral-900">
                Reposición Sin Costo
              </h4>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                Confirmado el fallo, despachamos un nuevo ejemplar sellado a tu domicilio sin cobrar gastos adicionales de transporte.
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
