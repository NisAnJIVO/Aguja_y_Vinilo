import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { VinylCharacter } from "@/components/ui/VinylCharacter";

export const metadata: Metadata = {
  title: "Términos del Servicio | Aguja & Vinilo",
  description: "Condiciones de compra, términos de suscripción y garantías comerciales de Aguja & Vinilo en Bolivia.",
};

export default function TerminosPage() {
  return (
    <main className="w-full min-h-screen bg-white text-black py-10 sm:py-24 px-4 sm:px-12 lg:px-16">
      <div className="w-full max-w-[1520px] mx-auto space-y-16 sm:space-y-24">
        
        {/* =====================================================================
            ENCABEZADO EDITORIAL
           ===================================================================== */}
        <div className="border-b border-black/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
              Marco Legal &amp; Contratación • Bolivia
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-black">
              Términos del Servicio
            </h1>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-600">
            <span className="block font-bold text-neutral-900 text-sm">Vigente desde Enero 2026</span>
            <span>Compras protegidas y transparentes en Bolivianos (Bs.)</span>
          </div>
        </div>

        {/* =====================================================================
            BLOQUE 1: IDENTIDAD & VALIDEZ COMERCIAL
           ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 items-start">
          
          <div className="lg:col-span-5 space-y-5">
            {/* Nuestro amiguito protagonista con su maletín corporativo formal */}
            <div className="mb-6">
              <VinylCharacter size={105} pose="corporate" />
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-black leading-tight">
              Reglas claras para una relación de confianza duradera.
            </h2>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block">
              Comercialización Directa en Moneda Nacional
            </span>
          </div>

          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-neutral-700 leading-relaxed font-light">
            <p>
              El acceso, navegación y adquisición de productos a través de <strong className="font-medium text-neutral-900">Aguja &amp; Vinilo</strong> se rige bajo los presentes Términos y Condiciones. Al formalizar un pedido en nuestra plataforma, el usuario acepta de manera íntegra estas cláusulas.
            </p>
            <p>
              Todos los precios de catálogo están expresados en <strong className="font-medium text-neutral-900">Bolivianos (Bs.)</strong> e incluyen embalaje protector multicapa. No existen cargos ocultos ni sobrecostos de procesamiento al momento de pagar.
            </p>
            <p>
              Nuestra sede comercial y centro de resolución de controversias se ubica en la ciudad de <strong className="font-medium text-neutral-900">Sucre, Chuquisaca, Estado Plurinacional de Bolivia</strong>.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/privacidad"
                className="inline-block px-5 py-2.5 border border-black text-black hover:bg-black hover:text-white transition-colors text-xs font-mono uppercase tracking-wider"
              >
                Políticas de Privacidad
              </Link>
              <Link
                href="/devoluciones"
                className="inline-block px-5 py-2.5 border border-neutral-300 text-neutral-700 hover:border-black hover:text-black transition-colors text-xs font-mono uppercase tracking-wider"
              >
                Garantías &amp; Devoluciones
              </Link>
            </div>
          </div>

        </div>

        {/* Separador fino */}
        <div className="w-full border-b border-neutral-200" />

        {/* =====================================================================
            BLOQUE 2: CLÁUSULAS CONTRACTUALES (ESTILO EDITORIAL MINIMALISTA)
           ===================================================================== */}
        <div>
          <div className="mb-10 sm:mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
              Cláusulas Operativas
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-neutral-900">
              Condiciones de Compra y Membresía
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 font-mono text-xs">
            
            <div className="space-y-3">
              <span className="text-neutral-400 block font-bold">ART. 01 / AUTENTICIDAD</span>
              <h4 className="font-serif text-xl font-normal text-neutral-900">
                Prensados Nuevos
              </h4>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                Todos los vinilos comercializados son copias originales nuevas y selladas. Los gramajes corresponden estrictamente a 180g o 200g virgen según la ficha de cada título.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-neutral-400 block font-bold">ART. 02 / SUSCRIPCIÓN</span>
              <h4 className="font-serif text-xl font-normal text-neutral-900">
                Plan Miembro Plus
              </h4>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                La suscripción mensual (Bs. 500) incluye 3 vinilos al mes entregados en 1 despacho semanal. No tiene contrato de permanencia; el usuario puede cancelar o pausar desde su panel en cualquier momento.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-neutral-400 block font-bold">ART. 03 / ENTREGAS</span>
              <h4 className="font-serif text-xl font-normal text-neutral-900">
                Envíos &amp; Riesgo
              </h4>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                El riesgo de transporte queda cubierto al 100% por Aguja &amp; Vinilo. Ante extravío o rotura de paquetería comprobada, reponemos el pedido de inmediato sin coste alguno.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-neutral-400 block font-bold">ART. 04 / JURISDICCIÓN</span>
              <h4 className="font-serif text-xl font-normal text-neutral-900">
                Leyes de Bolivia
              </h4>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                Cualquier discrepancia comercial será resuelta bajo las leyes del Estado Plurinacional de Bolivia, fijando domicilio procesal en la ciudad de Sucre, Chuquisaca.
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
